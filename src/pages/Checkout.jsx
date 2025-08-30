import { useState } from 'react'
import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'
import { saveOrder } from '../services/orderService'
import { useNavigate, Link } from 'react-router-dom'

export default function Checkout(){
  const { items, total, dispatch } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({ name: user?.displayName || '', email: user?.email || '', address:'', payment:'COD' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if(!form.name || !form.email || !form.address) { setError('Please fill all required fields.'); return }
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { setError('Please enter a valid email.'); return }
    try{
      setLoading(true)
      await saveOrder(user?.uid || 'guest', {
        name: form.name,
        email: form.email,
        address: form.address,
        payment: form.payment,
        items: items.map(i => ({ id:i.id, name:i.name, price:i.price, qty:i.qty })),
        total
      })
      setSuccess(true)
      dispatch({ type:'CLEAR' })
      setTimeout(() => navigate('/orders'), 1200)
    }catch(err){
      setError(err.message || 'Failed to place order.')
    }finally{
      setLoading(false)
    }
  }

  if(!items.length){
    return (
      <div className="container py-5 text-center">
        <h3>No items to checkout</h3>
        <Link className="btn btn-brand text-white mt-3" to="/products">Shop Now</Link>
      </div>
    )
  }

  return (
    <div className="container py-4" style={{ flex: 1, background: 'linear-gradient(120deg, #e8f5e9 0%, #fff 100%)', borderRadius: '1.5rem', boxShadow: '0 2px 24px rgba(46,125,50,0.07)' }}>
      <div className="mb-4">
        <div className="progress" style={{height:'8px', borderRadius:'4px', background:'#d0e8d0'}}>
          <div className="progress-bar bg-success" style={{width:'80%', borderRadius:'4px'}}></div>
        </div>
        <h1 className="h3 mt-4 mb-2 fw-bold text-brand d-flex align-items-center"><i className="bi bi-bag-check-fill me-2"></i>Checkout</h1>
        <div className="text-muted mb-2" style={{fontSize:'1.1rem'}}>Almost there! Please confirm your details and place your order.</div>
      </div>
      <div className="row g-4">
        <div className="col-lg-7">
          <form className="checkout-card p-4 shadow-lg" onSubmit={onSubmit} style={{background:'#fff', borderRadius:'1.5rem', fontSize:'1.18rem', boxShadow:'0 4px 24px rgba(46,125,50,0.10)'}}>
            <h4 className="mb-4 text-success d-flex align-items-center"><i className="bi bi-person-lines-fill me-2"></i>Contact & Delivery</h4>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label" style={{fontSize:'1.25rem', fontWeight:'bold'}}>Name *</label>
                <div className="input-group">
                  <span className="input-group-text" style={{fontSize:'1.3rem'}}><i className="bi bi-person"></i></span>
                  <input className="form-control" style={{fontSize:'1.25rem', height:'2.8rem'}} value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required />
                </div>
              </div>
              <div className="col-md-6">
                <label className="form-label" style={{fontSize:'1.25rem', fontWeight:'bold'}}>Email *</label>
                <div className="input-group">
                  <span className="input-group-text" style={{fontSize:'1.3rem'}}><i className="bi bi-envelope"></i></span>
                  <input type="email" className="form-control" style={{fontSize:'1.25rem', height:'2.8rem'}} value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required />
                </div>
              </div>
              <div className="col-12">
                <label className="form-label">Address *</label>
                <div className="input-group">
                  <span className="input-group-text"><i className="bi bi-geo-alt"></i></span>
                  <textarea className="form-control" rows="3" value={form.address} onChange={e=>setForm({...form, address:e.target.value})} required></textarea>
                </div>
              </div>
              <div className="col-md-6">
                <label className="form-label">Payment Method</label>
                <div className="input-group">
                  <span className="input-group-text"><i className="bi bi-credit-card"></i></span>
                  <select className="form-select" value={form.payment} onChange={e=>setForm({...form, payment:e.target.value})}>
                    <option>COD</option>
                    <option>UPI</option>
                    <option>Card</option>
                  </select>
                </div>
              </div>
            </div>
            {error && <div className="alert alert-danger mt-3">{error}</div>}
            {success && <div className="alert alert-success mt-3">Order placed! Redirecting…</div>}
            <button className="btn btn-brand text-white mt-4 w-100 py-2 fs-5 rounded-pill shadow-sm" style={{letterSpacing:'1px', fontWeight:'bold', fontSize:'1.25rem'}} disabled={loading}>
              {loading ? <><span className="spinner-border spinner-border-sm me-2"></span>Placing Order…</> : <><i className="bi bi-bag-check me-2"></i>Place Order</>}
            </button>
          </form>
        </div>
        <div className="col-lg-5">
          <div className="checkout-summary-card p-4 shadow-lg" style={{background:'#fff', borderRadius:'1.5rem', fontSize:'1.18rem', boxShadow:'0 4px 24px rgba(46,125,50,0.10)'}}>
            <h5 className="mb-3 text-success d-flex align-items-center"><i className="bi bi-receipt-cutoff me-2"></i>Order Summary</h5>
            <ul className="list-group list-group-flush mb-3">
              {items.map(i => (
                <li key={i.id} className="list-group-item d-flex justify-content-between align-items-center bg-transparent border-0 border-bottom py-2">
                  <span className="fw-semibold"><i className="bi bi-basket2 me-2 text-success"></i>{i.name} <span className="badge bg-light text-dark ms-2">× {i.qty}</span></span>
                  <span className="fw-bold">₹ {i.price * i.qty}</span>
                </li>
              ))}
            </ul>
            <hr/>
            <div className="d-flex justify-content-between align-items-center fw-bold fs-5 mb-2">
              <span>Total</span><span>₹ {total}</span>
            </div>
            <div className="text-muted small">Delivery: <span className="text-success">FREE</span></div>
          </div>
        </div>
      </div>
    </div>
  )
}

