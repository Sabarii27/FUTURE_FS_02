import { useCart } from '../contexts/CartContext'
import { Link } from 'react-router-dom'

export default function Cart(){
  const { items, total, dispatch } = useCart()

  if(!items.length){
    return (
      <div className="container py-5 text-center">
        <h3>Your cart is empty</h3>
        <Link className="btn btn-brand text-white mt-3" to="/products">Go to Products</Link>
      </div>
    )
  }

  return (
    <div className="container py-4" style={{ flex: 1 }}>
      <h1 className="h3 mb-4 fw-bold text-brand">🛒 Shopping Cart</h1>
      <div className="row g-4">
        <div className="col-lg-8">
          <div className="cart-card p-3 p-md-4">
            {items.map(i => (
              <div className="cart-item-row d-flex align-items-center justify-content-between px-2 px-md-3 py-3" key={i.id}>
                <div className="d-flex align-items-center gap-3">
                  <img src={i.image} alt={i.name} width="120" height="85" className="cart-img" style={{objectFit:'cover'}}/>
                  <div>
                    <div className="fw-semibold fs-5 text-dark">{i.name}</div>
                    <div className="text-muted small">₹ {i.price}</div>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <button className="cart-qty-btn" onClick={()=>dispatch({type:'DEC', id:i.id})}>-</button>
                  <span className="px-2 fs-5">{i.qty}</span>
                  <button className="cart-qty-btn" onClick={()=>dispatch({type:'INC', id:i.id})}>+</button>
                  <button className="cart-remove-btn ms-2" onClick={()=>dispatch({type:'REMOVE', id:i.id})}><i className="bi bi-trash"></i> Remove</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-lg-4">
          <div className="cart-summary-card p-4 sticky-top" style={{top:90}}>
            <h5 className="mb-3 text-brand">Order Summary</h5>
            <div className="d-flex justify-content-between mb-2"><span>Subtotal</span><span className="fw-semibold">₹ {total}</span></div>
            <div className="d-flex justify-content-between mb-2"><span>Delivery</span><span className="text-success">FREE</span></div>
            <hr/>
            <div className="d-flex justify-content-between fw-bold fs-5 mb-3"><span>Total</span><span>₹ {total}</span></div>
            <Link to="/checkout" className="btn btn-brand text-white w-100 py-2 fs-5 rounded-pill shadow-sm">Proceed to Checkout</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
