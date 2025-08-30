import { useMemo, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { products, CATEGORIES } from '../data/products'
import ProductCard from '../components/ProductCard'

export default function Products() {
  const [q, setQ] = useState('')
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialCat = params.get('cat') || 'All';
  const [cat, setCat] = useState(initialCat);

  useEffect(() => {
    const urlCat = params.get('cat');
    if (urlCat && urlCat !== cat) setCat(urlCat);
    // eslint-disable-next-line
  }, [location.search]);

  const filtered = useMemo(() => {
    return products.filter(p => 
      (cat === 'All' || p.category === cat) && 
      (p.name.toLowerCase().includes(q.toLowerCase()))
    )
  }, [q, cat])

  return (
    <div className="container py-4" style={{ flex: 1 }}>
      <div className="d-md-flex justify-content-between align-items-end gap-3">
        <div className="mb-3">
          <h1 className="h3 mb-1">Products</h1>
          <small className="text-muted">Browse our organic range</small>
        </div>
        <div className="d-flex gap-2 flex-wrap">
          <input className="form-control" placeholder="Search products..." value={q} onChange={e=>setQ(e.target.value)} />
          <select className="form-select" value={cat} onChange={e=>setCat(e.target.value)}>
            <option>All</option>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div className="row g-3 mt-2">
        {filtered.map(p => (
          <div className="col-12 col-sm-6 col-lg-3" key={p.id}>
            <ProductCard p={p}/>
          </div>
        ))}
      </div>
    </div>
  )
}
