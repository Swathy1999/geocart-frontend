import { useEffect, useState } from "react";
import { getProducts } from "../../api/apiService";
import ProductCard from "../components/ProductCard";
function Products() {
  const [products, setProducts] = useState([]),
    [q, setQ] = useState("");
  useEffect(() => {
    getProducts()
      .then((r) => setProducts(r.data.products))
      .catch(() => {});
  }, []);
  const visible = products.filter((p) =>
    `${p.name} ${p.category} ${p.store?.name}`
      .toLowerCase()
      .includes(q.toLowerCase()),
  );
  return (
    <div className="container page-wrap">
      <div className="section-kicker">From nearby shops</div>
      <h1 className="section-title">Browse products</h1>
      <p className="muted">A little bit of local goodness, all in one place.</p>
      <input
        className="form-control my-4"
        placeholder="Search products"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <div className="row g-3">
        {visible.map((p) => (
          <div className="col-6 col-md-4 col-lg-3" key={p._id}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>
      {!visible.length && <div className="empty-state">No products found.</div>}
    </div>
  );
}
export default Products;
