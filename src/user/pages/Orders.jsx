import React, { useEffect, useState } from "react";
import { getMyOrders } from "../../api/apiService";
function Orders() {
  const [orders, setOrders] = useState([]),
    [error, setError] = useState("");
  useEffect(() => {
    getMyOrders()
      .then((r) => setOrders(r.data.orders))
      .catch((e) =>
        setError(e.response?.data?.message || "Unable to load orders"),
      );
  }, []);
  return (
    <div className="container page-wrap">
      <div className="section-kicker">Your purchases</div>
      <h1 className="section-title">Order history</h1>
      {error && <div className="alert alert-warning">{error}</div>}
      {orders.map((o) => (
        <div className="form-card mb-3" key={o._id}>
          <div className="d-flex justify-content-between flex-wrap gap-2">
            <strong>{o.orderNumber}</strong>
            <span className="pill">{o.status.replaceAll("_", " ")}</span>
          </div>
          <div className="muted small mt-2">
            {o.store?.name} · {new Date(o.createdAt).toLocaleString()}
          </div>
          <div className="mt-3">
            {o.items.map((i, n) => (
              <div className="d-flex justify-content-between small" key={n}>
                <span>
                  {i.name} × {i.quantity}
                </span>
                <span>BHD {(i.price * i.quantity).toFixed(3)}</span>
              </div>
            ))}
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <span>Total · Cash on delivery</span>
            <strong>BHD {o.total.toFixed(3)}</strong>
          </div>
        </div>
      ))}
      {!orders.length && !error && (
        <div className="empty-state mt-3">Your orders will show up here.</div>
      )}
    </div>
  );
}
export default Orders