import { useShare } from "../../contextApi/ShareContext";
import React from "react";

function ProductCard({ product, store }) {
  const { addToCart, cart, favorites, toggleFavorite } = useShare();
  const owner = store || product.store;
  const inCart = cart.some((x) => x.product._id == product._id);
  return (
    <article className="soft-card">
      <div className="position-relative">
        <img
          className="product-image"
          src={
            product.image ||
            "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600"
          }
          alt={product.name}
        />
        <button
          className="btn btn-light btn-sm position-absolute top-0 end-0 m-2"
          onClick={() => toggleFavorite(product._id)}
          aria-label="Toggle favourite"
        >
          <i
            className={`bi ${favorites.includes(product._id) ? "bi-heart-fill text-danger" : "bi-heart"}`}
          />
        </button>
      </div>
      <div className="p-3">
        <div className="small muted">{product.category}</div>
        <h3 className="h6 fw-bold mt-1">{product.name}</h3>
        <div className="small muted mb-2">{owner?.name || "Local store"}</div>
        <div className="d-flex justify-content-between align-items-center">
          <strong>BHD {Number(product.price).toFixed(3)}</strong>
          <button
            className="btn btn-success btn-sm"
            disabled={!owner || product.stock < 1 || inCart}
            onClick={() => addToCart(product, owner)}
          >
            {product.stock < 1 ? "Sold out" : inCart ? "Added" : "Add +"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
