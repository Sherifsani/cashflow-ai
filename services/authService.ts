import { userPool } from '../config/cognito';
import { CognitoUser, AuthenticationDetails, CognitoUserAttribute } from 'amazon-cognito-identity-js';

class AuthService {
  // Sign Up
  signUp({email, password, firstName, lastName} : SignUpFormData) {
    return new Promise((resolve, reject) => {

    const attributeList = [
      new CognitoUserAttribute({ Name: 'email', Value: email }),
      new CognitoUserAttribute({ Name: 'given_name', Value: firstName }),
      new CognitoUserAttribute({ Name: 'family_name', Value: lastName }),
    ];

    userPool.signUp(email, password, attributeList, null, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
    });
  }

  // Confirm Sign Up (Email verification)
  confirmSignUp({email, verificationCode}: VerificationData) {
    return new Promise((resolve, reject) => {
      const cognitoUser = new CognitoUser({
        Username: email,
        Pool: userPool
      });

      cognitoUser.confirmRegistration(verificationCode, true, (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  }

  // Sign In
  signIn({email, password}: SignInFormData) {
    return new Promise((resolve, reject) => {
      const authenticationDetails = new AuthenticationDetails({
        Username: email,
        Password: password
      });

      const cognitoUser = new CognitoUser({
        Username: email,
        Pool: userPool
      });

      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          const tokens = {
            accessToken: result.getAccessToken().getJwtToken(),
            idToken: result.getIdToken().getJwtToken(),
            refreshToken: result.getRefreshToken().getToken()
          };
          
          // Store tokens
          localStorage.setItem('cognitoTokens', JSON.stringify(tokens));
          
          // Create user profile in your backend
          this.createUserProfile(result.getIdToken().payload);
          
          resolve(tokens);
        },
        onFailure: (err) => {
          reject(err);
        }
      });
    });
  }

  // Create user profile in backend after Cognito signup
  async createUserProfile(tokenPayload) {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getIdToken()}`
        },
        body: JSON.stringify({
          userId: tokenPayload.sub,
          email: tokenPayload.email,
          firstName: tokenPayload.given_name,
          lastName: tokenPayload.family_name
        })
      });
      
      if (!response.ok) {
        console.error('Failed to create user profile');
      }
    } catch (error) {
      console.error('Error creating user profile:', error);
    }
  }

  // Get stored tokens
  getTokens() {
    const tokens = localStorage.getItem('cognitoTokens');
    return tokens ? JSON.parse(tokens) : null;
  }

  // Get ID token for API calls
  getIdToken() {
    const tokens = this.getTokens();
    return tokens ? tokens.idToken : null;
  }

  // Check if user is authenticated
  isAuthenticated() {
    const token = this.getIdToken();
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }

  // Get current user info from token
  getCurrentUser() {
    const token = this.getIdToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        userId: payload.sub,
        email: payload.email,
        firstName: payload.given_name,
        lastName: payload.family_name
      };
    } catch {
      return null;
    }
  }

  // Sign Out
  signOut() {
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser) {
      cognitoUser.signOut();
    }
    localStorage.removeItem('cognitoTokens');
  }

  // Refresh tokens
  refreshTokens() {
    return new Promise((resolve, reject) => {
      const cognitoUser = userPool.getCurrentUser();
      if (!cognitoUser) {
        reject(new Error('No current user'));
        return;
      }

      cognitoUser.getSession((err, session) => {
        if (err) {
          reject(err);
          return;
        }

        if (session.isValid()) {
          const tokens = {
            accessToken: session.getAccessToken().getJwtToken(),
            idToken: session.getIdToken().getJwtToken(),
            refreshToken: session.getRefreshToken().getToken()
          };
          
          localStorage.setItem('cognitoTokens', JSON.stringify(tokens));
          resolve(tokens);
        } else {
          reject(new Error('Session invalid'));
        }
      });
    });
  }
}

export default new AuthService();