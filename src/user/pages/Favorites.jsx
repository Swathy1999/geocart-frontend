import React, { useEffect, useState } from "react";
import { useShare } from "../../contextApi/ShareContext";
import { getProducts } from "../../api/apiService";
import ProductCard from "../components/ProductCard";
function Favorites() {
  const { favorites } = useShare();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts()
      .then((r) => setProducts(r.data.products))
      .catch(() => {});
  }, []);
  const saved = products.filter((p) => favorites.includes(p._id));
  return (
    <div className="container page-wrap">
      <div className="section-kicker">Your shortlist</div>
      <h1 className="section-title">Saved favourites</h1>
      <div className="row g-3 mt-2">
        {saved.map((p) => (
          <div className="col-6 col-md-4 col-lg-3" key={p._id}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>
      {!saved.length && (
        <div className="empty-state mt-3">
          Tap the heart on a product to keep it here.
        </div>
      )}
    </div>
  );
}

export default Favorites