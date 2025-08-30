import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContext'
import { useWishlist } from '../contexts/WishlistContext'

import { useRef } from 'react'
import { useEffect } from 'react'
export default function Navbar(){
  const { user, logout } = useAuth()
  const { items } = useCart()
  const { wishlist } = useWishlist()
  const navRef = useRef()


  // More robust closeNav for all browsers and Bootstrap versions
  const closeNav = () => {
    if (window.innerWidth < 992) {
      const nav = navRef.current;
      if (nav && nav.classList.contains('show')) {
        // Try Bootstrap 5 way
        if (window.bootstrap && window.bootstrap.Collapse) {
          window.bootstrap.Collapse.getOrCreateInstance(nav).hide();
        } else {
          // Fallback: manually remove 'show' class and set aria attributes
          nav.classList.remove('show');
          nav.setAttribute('aria-expanded', 'false');
          // Also collapse the toggler button
          const toggler = document.querySelector('.navbar-toggler');
          if (toggler) toggler.setAttribute('aria-expanded', 'false');
        }
      }
    }
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top shadow-sm">
      <div className="container-fluid px-3 d-flex align-items-center">
        <Link className="navbar-brand me-4" to="/" style={{marginRight: '2rem'}} onClick={closeNav}>🌿 Organic</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="nav" ref={navRef}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><NavLink to="/" className="nav-link" onClick={closeNav}>Home</NavLink></li>
            <li className="nav-item"><NavLink to="/products" className="nav-link" onClick={closeNav}>Products</NavLink></li>
            {user && <li className="nav-item"><NavLink to="/orders" className="nav-link" onClick={closeNav}>Order History</NavLink></li>}
          </ul>
          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item me-2">
              <NavLink to="/wishlist" className="btn btn-outline-danger btn-lg d-flex align-items-center px-4 py-2" style={{fontSize: '1.5rem'}} onClick={closeNav}>
                <i className="bi bi-heart me-2"></i>
                <span>({wishlist.length})</span>
              </NavLink>
            </li>
            <li className="nav-item me-2">
              <NavLink to="/cart" className="btn btn-outline-success btn-lg d-flex align-items-center px-4 py-2" style={{fontSize: '1.5rem'}} onClick={closeNav}>
                <i className="bi bi-cart3 me-2"></i>
                <span>({items.reduce((a,b)=>a+b.qty,0)})</span>
              </NavLink>
            </li>
            {!user ? (
              <li className="nav-item">
                <NavLink to="/auth" className="btn btn-brand text-white btn-lg d-flex align-items-center px-4 py-2" style={{fontSize: '1.5rem'}} onClick={closeNav}>
                  <i className="bi bi-person-circle"></i>
                </NavLink>
              </li>
            ):(
              <li className="nav-item dropdown">
                <button className="btn dropdown-toggle d-flex align-items-center gap-2 px-3 py-2" data-bs-toggle="dropdown" style={{ fontWeight: 600, fontSize: '1.2rem', color: '#2e7d32', background: '#e8f5e9', borderRadius: '2rem', boxShadow: '0 2px 8px rgba(46,125,50,0.08)' }}>
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="profile" width={36} height={36} style={{ borderRadius: '50%', objectFit: 'cover', border: '2px solid #c8e6c9', background: '#fff', marginRight: 4 }} />
                  ) : (
                    <i className="bi bi-person-circle me-1" style={{ fontSize: '1.7rem', color: '#388e3c' }}></i>
                  )}
                  <span style={{ fontWeight: 700, letterSpacing: '0.5px', fontSize: '1.15rem', color: '#1b5e20' }}>{user.displayName || 'User'}</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end p-2" style={{ minWidth: 200, borderRadius: '1rem', boxShadow: '0 4px 18px rgba(46,125,50,0.10)', background: '#f8fafb' }}>
                  <li>
                    <NavLink className="dropdown-item d-flex align-items-center gap-2 py-2 rounded" to="/orders" onClick={closeNav} style={{ fontWeight: 500, fontSize: '1.08rem', color: '#2e7d32', background: '#e8f5e9' }}>
                      <i className="bi bi-bag-check-fill text-success" style={{ fontSize: '1.2rem' }}></i>
                      My Orders
                    </NavLink>
                  </li>
                  <li>
                    <button className="dropdown-item d-flex align-items-center gap-2 py-2 rounded" onClick={logout} style={{ fontWeight: 500, fontSize: '1.08rem', color: '#c62828', background: '#fff0f0' }}>
                      <i className="bi bi-box-arrow-right" style={{ fontSize: '1.2rem' }}></i>
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}
