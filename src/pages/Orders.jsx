// src/pages/OrderHistory.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";

export default function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const q = query(
        collection(db, "orders"),
  where("uid", "==", user.uid),//ghj
        orderBy("createdAt", "desc")
      );
      const unsub = onSnapshot(q, (snap) => {
        setOrders(snap.docs.map(d => ({ id: d.id, ...d.data() })));
        setLoading(false);
      }, (err) => {
        setError(err.message);
        setLoading(false);
      });
      return unsub;
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, [user]);

  return (
    <div className="container py-4">
      <h3>Your Orders</h3>
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-success mb-3" role="status"></div>
          <div>Loading your orders...</div>
        </div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map(o => (
          <div key={o.id} className="order-history-card p-3 mb-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <strong className="fs-5 text-success">Order Total: ₹{o.total}</strong>
              <span className="text-muted" style={{ fontSize: 14 }}>{o.createdAt?.toDate?.().toLocaleString?.() || "-"}</span>
            </div>
            <ul className="mt-2 mb-0 ps-1">
              {o.items.map(it => (
                <li key={it.id} className="mb-2 d-flex align-items-center">
                  <img
                    src={it.image || `/images/${it.name.toLowerCase().split(' ')[0]}.png`}
                    alt={it.name}
                    width={72}
                    height={72}
                    style={{ objectFit: 'cover', borderRadius: '0.7rem', border: '2px solid #c8e6c9', background: '#f8f8f8', marginRight: 18 }}
                    onError={e => { e.target.onerror = null; e.target.src = '/images/apples.png'; }}
                  />
                  <span className="fw-semibold">{it.name}</span>
                  <span className="text-muted ms-2">× {it.qty}</span>
                  <span className="text-success ms-auto">₹{it.price}</span>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}
