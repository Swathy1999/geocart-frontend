import { Link } from "react-router-dom";
import React from "react";

function StoreCard({ store }) {
  return (
    <Link to={`/stores/${store._id}`} className="text-dark">
      <article className="soft-card">
        <img
          className="store-image"
          src={
            store.image ||
            "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800"
          }
          alt={store.name}
        />
        <div className="p-3">
          <div className="d-flex justify-content-between align-items-center">
            <span className="pill">{store.category}</span>
            <span
              className={`badge rounded-pill ${store.isOpen ? "badge-open" : "badge-closed"}`}
            >
              {store.isOpen ? "Open now" : "Closed"}
            </span>
          </div>
          <h3 className="h5 fw-bold mt-3 mb-1">{store.name}</h3>
          <p className="small muted mb-3">
            <i className="bi bi-geo-alt me-1" />
            {store.address}
          </p>
          <div className="d-flex justify-content-between small">
            <span className="muted">
              Delivery up to {store.deliveryRadiusKm} km
            </span>
            <strong>
              {Number(store.deliveryFee) == 0
                ? "Free delivery"
                : `BHD ${Number(store.deliveryFee).toFixed(3)}`}
            </strong>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default StoreCard;
