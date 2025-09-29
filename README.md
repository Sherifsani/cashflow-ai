# SafeNest Frontend

SafeNest is a secure financial platform designed to provide **savings, insurance, and micro-loans** to users. This repository contains the **frontend**, built using **Next.js (App Router)** and styled with **Tailwind CSS**. It is structured to ensure a seamless user experience, with a dynamic layout that adapts based on user authentication status.

---

## 🚀 Features
- **Dynamic Layouts:** Different navigation and UI for homepage and dashboard.
- **Client & Server Components:** Optimized with Next.js best practices.
- **Authentication Flow:** User login and registration (Coming Soon).
- **State Management:** Plan to use Zustand or Redux for state management.
- **API Integration:** Connects with the SafeNest backend for authentication, savings, loans, and insurance features.
- **Mobile-Responsive UI:** Fully optimized using Tailwind CSS.

---

## 🏗️ Project Structure
This project follows a clean structure for better organization and scalability:
```
├── app/
│   ├── layout.js          # Root layout for the app (Server Component)
│   ├── page.js            # Home Page (Landing Page)
│   ├── dashboard/
│   │   ├── page.js        # Dashboard Main Page
│   │   ├── savings.js     # Savings Section
│   │   ├── loans.js       # Loans Section
│   │   ├── insurance.js   # Insurance Section
├── components/
│   ├── ClientLayout.jsx   # Handles layout switching between Home & Dashboard
│   ├── HomeNavbar.jsx     # Navbar for the Landing Page
│   ├── DashboardNavbar.jsx# Navbar for Dashboard Pages
│   ├── Sidebar.jsx        # Sidebar for Dashboard Navigation
│   ├── Footer.jsx         # Footer Component (if needed)
├── public/                # Static assets (images, icons, logos, etc.)
├── styles/                # Global styles (Tailwind CSS)
├── README.md              # Project Documentation
```

---

## 🛠️ Setup & Installation
### 1️⃣ Clone the Repository
To get started with the frontend development, clone this repository:
```bash
git clone https://github.com/your-repo/safenest-frontend.git
cd safenest-frontend
```

### 2️⃣ Install Dependencies
Ensure that you have **Node.js 18+** installed, then install the required dependencies:
```bash
npm install  # or yarn install
```

### 3️⃣ Run the Development Server
To start the development server, run:
```bash
npm run dev  # or yarn dev
```
Then, open **http://localhost:3000/** in your browser to see the application in action.

---

## 🛠️ Key Fixes & Implementations
### ✅ **Fixed Layout Issue (Client & Server Components)**
#### **Problem:**
- `usePathname()` caused an error when used in `layout.js` because **Next.js Server Components** do not support React hooks.

#### **Solution:**
- We created a separate **Client Component (`ClientLayout.jsx`)** and moved the `usePathname()` logic there.
- `layout.js` remains a **Server Component** and only wraps the ClientLayout.
- Now, layout switching between home and dashboard works correctly.

### ✅ **Dynamic Navbar & Sidebar Implementation**
#### **Behavior:**
- **Landing Page (`/`)** → Displays `HomeNavbar`.
- **Dashboard Pages (`/dashboard/*`)** → Displays `DashboardNavbar` and `Sidebar`.
- **Navigation updates dynamically based on the current route.**

#### **Code Breakdown:**
- `layout.js` (Server Component) → Wraps everything.
- `ClientLayout.jsx` (Client Component) → Handles `usePathname()` and renders the correct layout.
- `Sidebar.jsx` → Only shown in dashboard routes.
- `HomeNavbar.jsx` → Shown on the landing page.
- `DashboardNavbar.jsx` → Used inside the dashboard pages.

---

## 🎯 Next Steps
- 🔐 **Authentication Flow:** Implement login and signup with NextAuth.js or Firebase.
- 💳 **API Integration:** Connect frontend to backend for savings, insurance, and loans.
- 🎨 **UI Enhancements:** Improve the design with Tailwind CSS and animations.
- 📊 **State Management:** Implement Zustand or Redux for efficient state handling.
- 📱 **Mobile Optimization:** Ensure full responsiveness across devices.

---

## 📜 License
This project is licensed under the **MIT License**.

## 📞 Contact & Support
If you have any questions or need further assistance, feel free to contact:
📧 Email: **your.email@example.com**  
💬 Slack/Discord: **Team SafeNest**

# SafeNest Frontend

SafeNest is a secure financial platform designed to provide **savings, insurance, and micro-loans** to users. This repository contains the **frontend**, built using **Next.js (App Router)** and styled with **Tailwind CSS**. It is structured to ensure a seamless user experience, with a dynamic layout that adapts based on user authentication status.

---

## 🚀 Features
- **Dynamic Layouts:** Different navigation and UI for homepage and dashboard.
- **Client & Server Components:** Optimized with Next.js best practices.
- **Authentication Flow:** User login and registration (Coming Soon).
- **State Management:** Plan to use Zustand or Redux for state management.
- **API Integration:** Connects with the SafeNest backend for authentication, savings, loans, and insurance features.
- **Mobile-Responsive UI:** Fully optimized using Tailwind CSS.

---

## 🏗️ Project Structure
This project follows a clean structure for better organization and scalability:
```
├── app/
│   ├── layout.js          # Root layout for the app (Server Component)
│   ├── page.js            # Home Page (Landing Page)
│   ├── dashboard/
│   │   ├── page.js        # Dashboard Main Page
│   │   ├── savings.js     # Savings Section
│   │   ├── loans.js       # Loans Section
│   │   ├── insurance.js   # Insurance Section
├── components/
│   ├── ClientLayout.jsx   # Handles layout switching between Home & Dashboard
│   ├── HomeNavbar.jsx     # Navbar for the Landing Page
│   ├── DashboardNavbar.jsx# Navbar for Dashboard Pages
│   ├── Sidebar.jsx        # Sidebar for Dashboard Navigation
│   ├── Footer.jsx         # Footer Component (if needed)
├── public/                # Static assets (images, icons, logos, etc.)
├── styles/                # Global styles (Tailwind CSS)
├── README.md              # Project Documentation
```

---

## 🛠️ Setup & Installation
### 1️⃣ Clone the Repository
To get started with the frontend development, clone this repository:
```bash
git clone https://github.com/your-repo/safenest-frontend.git
cd safenest-frontend
```

### 2️⃣ Install Dependencies
Ensure that you have **Node.js 18+** installed, then install the required dependencies:
```bash
npm install  # or yarn install
```

### 3️⃣ Run the Development Server
To start the development server, run:
```bash
npm run dev  # or yarn dev
```
Then, open **http://localhost:3000/** in your browser to see the application in action.

---

## 🛠️ Key Fixes & Implementations
### ✅ **Fixed Layout Issue (Client & Server Components)**
#### **Problem:**
- `usePathname()` caused an error when used in `layout.js` because **Next.js Server Components** do not support React hooks.

#### **Solution:**
- We created a separate **Client Component (`ClientLayout.jsx`)** and moved the `usePathname()` logic there.
- `layout.js` remains a **Server Component** and only wraps the ClientLayout.
- Now, layout switching between home and dashboard works correctly.

### ✅ **Dynamic Navbar & Sidebar Implementation**
#### **Behavior:**
- **Landing Page (`/`)** → Displays `HomeNavbar`.
- **Dashboard Pages (`/dashboard/*`)** → Displays `DashboardNavbar` and `Sidebar`.
- **Navigation updates dynamically based on the current route.**

#### **Code Breakdown:**
- `layout.js` (Server Component) → Wraps everything.
- `ClientLayout.jsx` (Client Component) → Handles `usePathname()` and renders the correct layout.
- `Sidebar.jsx` → Only shown in dashboard routes.
- `HomeNavbar.jsx` → Shown on the landing page.
- `DashboardNavbar.jsx` → Used inside the dashboard pages.

---

## 🎯 Next Steps
- 🔐 **Authentication Flow:** Implement login and signup with NextAuth.js or Firebase.
- 💳 **API Integration:** Connect frontend to backend for savings, insurance, and loans.
- 🎨 **UI Enhancements:** Improve the design with Tailwind CSS and animations.
- 📊 **State Management:** Implement Zustand or Redux for efficient state handling.
- 📱 **Mobile Optimization:** Ensure full responsiveness across devices.

---

## 📜 License
This project is licensed under the **MIT License**.

## 📞 Contact & Support
If you have any questions or need further assistance, feel free to contact:
📧 Email: **your.email@example.com**  
💬 Slack/Discord: **Team SafeNest**

