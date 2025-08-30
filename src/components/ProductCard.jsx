
import { useCart } from '../contexts/CartContext'
import { useWishlist } from '../contexts/WishlistContext'

export default function ProductCard({ p }) {
  const { dispatch } = useCart();
  const { wishlist, dispatch: wishlistDispatch } = useWishlist();

  return (
  <div className="product-card h-100 shadow-sm position-relative">
      <button
        className={"position-absolute top-0 end-0 m-2 btn btn-sm " + (wishlist.find(item => item.id === p.id) ? "btn-danger" : "btn-outline-danger")}
        title={wishlist.find(item => item.id === p.id) ? "Remove from Wishlist" : "Add to Wishlist"}
        style={{zIndex:2}}
        onClick={() => wishlist.find(item => item.id === p.id)
          ? wishlistDispatch({type:'REMOVE', id:p.id})
          : wishlistDispatch({type:'ADD', item:p})
        }
      >
        <i className={wishlist.find(item => item.id === p.id) ? "bi bi-heart-fill" : "bi bi-heart"} style={{fontSize:'1.3rem'}}></i>
      </button>
      <img src={p.image} className="card-img-top" alt={p.name} />
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h6 className="card-title">{p.name}</h6>
          <span className="badge rounded-pill badge-category">{p.category}</span>
        </div>
        <p className="fw-bold mb-3">₹ {p.price}</p>
        <button className="btn btn-brand text-white mt-auto" onClick={()=>dispatch({type:'ADD', item:p})}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
