# Hanni & Bunny Store (Frontend) 🐰🛍️

A modern, minimalist E-commerce platform built with React and TypeScript. This project features a clean, monochrome design with smooth animations and dynamic role-based features.

## 🌟 Features

- **Role-Based Access:** Distinct experiences for `BUYER` and `SELLER` accounts.
- **Minimalist UI:** Clean black-and-white (Monochrome) aesthetic with glassmorphism touches and smooth transitions.
- **Seller Dashboard:** Sellers can manage their products and update the shipping status of their orders.
- **Smart Cart System:** Real-time quantity validation, stock checking, and seamless checkout.
- **Custom Modals:** Beautifully animated custom confirmation dialogs.
- **Responsive Design:** Optimized for both desktop and mobile viewing.

## 🛠️ Tech Stack

- **Framework:** [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language:** TypeScript
- **Routing:** React Router v6
- **State Management:** React Context API (AuthContext, CartContext)
- **HTTP Client:** Axios
- **Icons:** Lucide React
- **Notifications:** React Hot Toast

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/mystore-frontend.git
   cd mystore-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory and add your backend API URL:
   ```env
   VITE_API_URL=http://localhost:8000/api
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open in Browser**
   Navigate to `http://localhost:5173` in your browser.

## 📸 Screenshots

*(Add your screenshots here! Example format below)*

![Home Page](./public/logo/minimal.jpg)
*Minimalist Home Page Design*

---
**Note:** This frontend is designed to work with the **Hanni & Bunny Store Backend** (built with Django & Django REST Framework). Make sure the backend server is running simultaneously!
