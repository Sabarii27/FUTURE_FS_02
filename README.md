

<p align="center">
	<img src="https://img.icons8.com/color/96/000000/vegetarian-food-symbol.png" width="80" alt="Organic Groceries Logo"/>
</p>

# 🥦 Organic Groceries

**A Modern, Organic E-Commerce Experience**

<p align="center">
	<b>Organic Groceries</b> is a beautiful, full-stack mini Amazon-like store for healthy, sustainable shopping.<br>
	Browse fresh produce, add to cart, checkout securely, and track your orders—all with a clean, mobile-friendly UI.<br>
	Built with <b>React 18</b>, <b>Vite</b>, <b>Bootstrap 5</b>, and <b>Firebase</b> (Auth + Firestore).
</p>

<p align="center">
	<img src="https://img.shields.io/badge/React-18-blue?logo=react"/>
	<img src="https://img.shields.io/badge/Vite-5.0-purple?logo=vite"/>
	<img src="https://img.shields.io/badge/Bootstrap-5.3-blueviolet?logo=bootstrap"/>
	<img src="https://img.shields.io/badge/Firebase-Auth%20%26%20Firestore-ffca28?logo=firebase"/>
</p>

<p align="center">
	<a href="#features"><img src="https://img.shields.io/badge/Explore%20Features-green?style=for-the-badge"/></a>
	<a href="#local-setup"><img src="https://img.shields.io/badge/Quick%20Start-blue?style=for-the-badge"/></a>
</p>


---

## 🌱 Why Organic Groceries?

In a world full of processed foods, Organic Groceries brings you a digital experience for healthy, sustainable, and convenient shopping. This project is designed for:
- Learning modern full-stack web development (React, Vite, Firebase)
- Practicing e-commerce UI/UX best practices
- Showcasing a real-world, mobile-friendly CRUD app

---

## 🚀 Live Demo

<p align="center">
	<img src="https://user-images.githubusercontent.com/placeholder/demo-groceries.gif" alt="Organic Groceries Demo" width="700"/>
</p>

---

# Organic Groceries (React + Vite + Bootstrap + Firebase)

A mini Amazon-like Organic Grocery store with browsing, cart, checkout simulation, Firebase Auth, and Firestore order history.

---

## 🛒 Key Features

- 🏠 Beautiful hero section with organic theme and category navigation
- 🔍 Product listing with search, filter, and responsive grid
- 🛍️ Cart with quantity update, remove, and summary
- ✅ Secure checkout with form validation
- 🔐 Firebase Authentication (Email/Password, Google)
- 📦 Firestore order history per user
- 📱 Mobile-first, responsive design
- 🌟 Modern UI with Bootstrap 5 and custom CSS
- 🧪 Easy to extend for new features (wishlist, reviews, etc.)

---

## 📁 Folder Structure

```text
src/
	components/      # Reusable UI components (Navbar, Hero, ProductCard, etc.)
	contexts/        # React Contexts for Auth, Cart, Wishlist
	data/            # Static product/category data
	pages/           # Main app pages (Home, Products, Cart, Checkout, Orders, Auth)
	services/        # Firebase/Firestore service functions
	styles.css       # Custom global styles
	firebase.js      # Firebase config and exports
	main.jsx         # App entry point
```

---

## 🤝 Contributing

Contributions are welcome! To contribute:
1. Fork this repo
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Push to your fork and open a Pull Request

---

## Tech Stack
- React 18 + Vite
- Bootstrap 5 (CSS + JS via bundle)
- Firebase Authentication (Email/Password + Google)
- Firebase Firestore (orders per user)
- Context API for Auth + Cart
- React Router v6

## Features
- Home hero + organic theme
- Product listing with search and category filter
- Cart with quantity update/remove
- Checkout form validation & order save to Firestore
- Login/Register (Firebase) + Google login option
- Order history for logged-in user
- Responsive Bootstrap grid (1/2/4 columns)
- SEO meta tags in `index.html` and optimized placeholder images

## Local Setup

```bash
# 1) Install deps
npm install

# 2) Create your env
cp .env.sample .env
# Fill Firebase values in .env

# 3) Run dev
npm run dev
```

Open the URL from the terminal (typically `http://localhost:5173`).

## Firebase Setup
1. Create a project at https://console.firebase.google.com
2. Enable Authentication → Sign-in method: Email/Password and Google (optional).
3. Create a Web App and copy the config.
4. Create Firestore in **production mode** (or test) and a collection will be auto-created on first order: `orders`.
5. Set the `.env` values:

```
VITE_FIREBASE_API_KEY=xxx
VITE_FIREBASE_AUTH_DOMAIN=xxx.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=xxx
VITE_FIREBASE_STORAGE_BUCKET=xxx.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=xxx
VITE_FIREBASE_APP_ID=1:xxx:web:xxx
```

## Deploy
- **Vercel** or **Netlify**: Import the repo, set the same `.env` variables in project settings, and deploy.
- Build command: `npm run build`
- Output directory: `dist`

## Notes
- Images are lightweight placeholders in `/public/images`. Replace with product images for production.
- Firestore security rules: ensure authenticated users can only read their orders.
