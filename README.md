# Organic Groceries (React + Vite + Bootstrap + Firebase)

A mini Amazon-like Organic Grocery store with browsing, cart, checkout simulation, Firebase Auth, and Firestore order history.

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
