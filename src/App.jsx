import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Products from './pages/Products'
import WishlistPage from './pages/Wishlist'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Orders from './pages/Orders'
import AuthPage from './pages/Auth'
import ProtectedRoute from './components/ProtectedRoute'
import AuthProvider from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'
import { WishlistProvider } from './contexts/WishlistContext'


export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar/>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/products" element={<Products/>} />
                <Route path="/cart" element={<Cart/>} />
                <Route path="/checkout" element={
                  <ProtectedRoute>
                    <Checkout/>
                  </ProtectedRoute>
                }/>
                <Route path="/orders" element={
                  <ProtectedRoute>
                    <Orders/>
                  </ProtectedRoute>
                }/>
                <Route path="/auth" element={<AuthPage/>} />
                <Route path="/wishlist" element={<WishlistPage/>} />
              </Routes>
            </div>
            <Footer/>
          </div>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
// removed extra closing brace

function Footer(){
  return (
    <footer className="py-4 mt-5">
      <div className="container  text-center">
        <div>© {new Date().getFullYear()} Organic Groceries. All rights reserved.</div>
        {/* <div className="text-muted">Built with React & Bootstrap</div> */}
      </div>
    </footer>
  )
}
}
