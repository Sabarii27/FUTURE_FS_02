
import { useWishlist } from '../contexts/WishlistContext'
import { Link } from 'react-router-dom'


export default function WishlistPage() {
  const { wishlist, dispatch } = useWishlist();
  return (
    <div className="container py-4">
      <h1 className="h3 mb-4 text-brand">💖 My Wishlist</h1>
      {wishlist.length === 0 ? (
        <div className="alert alert-info d-flex flex-column align-items-start gap-3">
          <div>No items in your wishlist yet.</div>
          <Link to="/products" className="btn btn-outline-success">Go to Products</Link>
        </div>
      ) : (
        <div className="cart-card p-3 p-md-4">
          {wishlist.map(p => (
            <div className="cart-item-row d-flex align-items-center justify-content-between px-2 px-md-3 py-3" key={p.id}>
              <div className="d-flex align-items-center gap-3">
                <img src={p.image} alt={p.name} width="120" height="85" className="cart-img" style={{objectFit:'cover'}}/>
                <div>
                  <div className="fw-semibold fs-5 text-dark">{p.name}</div>
                  <div className="text-muted small">₹ {p.price}</div>
                </div>
              </div>
              <div className="d-flex align-items-center gap-2">
                <button className="cart-remove-btn ms-2" onClick={() => {
                  dispatch({ type: 'REMOVE', id: p.id });
                }}><i className="bi bi-trash"></i> Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
