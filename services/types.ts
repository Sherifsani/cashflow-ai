interface SignUpFormData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

interface VerificationData {
    email: string;
    verificationCode: string;
}

interface SignInFormData {
    email: string;
    password: string;
}