import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getStore } from "../../api/apiService";
import ProductCard from "../components/ProductCard";
function StoreDetails() {
  const { id } = useParams();
  const [data, setData] = useState(null),
    [error, setError] = useState("");
  useEffect(() => {
    getStore(id)
      .then((r) => setData(r.data))
      .catch((e) => setError(e.response?.data?.message || "Store not found"));
  }, [id]);
  if (error)
    return (
      <div className="container page-wrap">
        <div className="alert alert-warning">{error}</div>
        <Link to="/stores">Back to stores</Link>
      </div>
    );
  if (!data) return <div className="container page-wrap">Loading store…</div>;
  const s = data.store;
  return (
    <div className="container page-wrap">
      <Link to="/stores" className="text-success fw-bold">
        <i className="bi bi-arrow-left me-1" />
        All stores
      </Link>
      <div className="soft-card my-3">
        <img
          src={
            s.image ||
            "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200"
          }
          className="w-100"
          style={{ height: 270, objectFit: "cover" }}
          alt={s.name}
        />
        <div className="p-4">
          <span className="pill">{s.category}</span>
          <h1 className="section-title mt-3">{s.name}</h1>
          <p className="muted">{s.description}</p>
          <div className="row g-3 small">
            <div className="col-md-4">
              <i className="bi bi-geo-alt text-success me-2" />
              {s.address}
            </div>
            <div className="col-md-4">
              <i className="bi bi-clock text-success me-2" />
              {s.openingHours}
            </div>
            <div className="col-md-4">
              <i className="bi bi-truck text-success me-2" />
              Up to {s.deliveryRadiusKm} km delivery
            </div>
          </div>
        </div>
      </div>
      <h2 className="section-title">Products at this store</h2>
      <div className="row g-3">
        {data.products.map((p) => (
          <div className="col-6 col-md-4 col-lg-3" key={p._id}>
            <ProductCard product={p} store={s} />
          </div>
        ))}
      </div>
    </div>
  );
}
export default StoreDetails;
