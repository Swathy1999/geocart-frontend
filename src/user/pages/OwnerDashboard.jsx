import { useEffect, useState } from "react";
import {
  storeService,
  productService,
  orderService,
} from "../../services/allServices";
function OwnerDashboard() {
  const [stores, setStores] = useState([]),
    [products, setProducts] = useState([]),
    [orders, setOrders] = useState([]),
    [msg, setMsg] = useState("");
  const [store, setStore] = useState({
    name: "",
    category: "General",
    description: "",
    address: "",
    phone: "",
    longitude: "50.55",
    latitude: "26.12",
    deliveryRadiusKm: 5,
    deliveryFee: 0,
    minOrder: 0,
    image: "",
  });
  const [product, setProduct] = useState({
    storeId: "",
    name: "",
    description: "",
    category: "General",
    price: "",
    stock: 0,
    image: "",
  });
  const refresh = () =>
    Promise.all([
      storeService.mine(),
      productService.mine(),
      orderService.owner(),
    ])
      .then(([s, p, o]) => {
        setStores(s.data.stores);
        setProducts(p.data.products);
        setOrders(o.data.orders);
      })
      .catch((e) =>
        setMsg(e.response?.data?.message || "Could not load owner data"),
      );
  useEffect(() => {
    refresh();
  }, []);
  const createStore = async (e) => {
    e.preventDefault();
    try {
      await storeService.create({
        ...store,
        location: {
          type: "Point",
          coordinates: [Number(store.longitude), Number(store.latitude)],
        },
      });
      setMsg("Store submitted for administrator approval.");
      refresh();
    } catch (e) {
      setMsg(e.response?.data?.message || "Store could not be created");
    }
  };
  const createProduct = async (e) => {
    e.preventDefault();
    try {
      await productService.create(product);
      setMsg("Product added.");
      setProduct({
        ...product,
        name: "",
        description: "",
        price: "",
        stock: 0,
      });
      refresh();
    } catch (e) {
      setMsg(e.response?.data?.message || "Product could not be added");
    }
  };
  const status = async (id, next) => {
    try {
      await orderService.status(id, next);
      refresh();
    } catch (e) {
      setMsg(e.response?.data?.message || "Status update failed");
    }
  };
  return (
    <div className="container page-wrap">
      <div className="section-kicker">Your business</div>
      <h1 className="section-title">Store owner workspace</h1>
      {msg && <div className="alert alert-info">{msg}</div>}
      <div className="row g-4">
        <div className="col-lg-6">
          <form className="form-card" onSubmit={createStore}>
            <h2 className="h5 fw-bold">Register a store</h2>
            {[
              "name",
              "category",
              "description",
              "address",
              "phone",
              "image",
              "longitude",
              "latitude",
              "deliveryRadiusKm",
              "deliveryFee",
              "minOrder",
            ].map((k) => (
              <div className="mb-2" key={k}>
                <label className="form-label text-capitalize">{k}</label>
                <input
                  className="form-control"
                  value={store[k]}
                  onChange={(e) => setStore({ ...store, [k]: e.target.value })}
                  required={["name", "address"].includes(k)}
                />
              </div>
            ))}
            <button className="btn btn-success">Submit store</button>
            <p className="small muted mt-2">
              Coordinates use longitude, latitude. The listing appears publicly
              after admin approval.
            </p>
          </form>
        </div>
        <div className="col-lg-6">
          <form className="form-card" onSubmit={createProduct}>
            <h2 className="h5 fw-bold">Add a product</h2>
            <label className="form-label">Store</label>
            <select
              className="form-select mb-2"
              value={product.storeId}
              onChange={(e) =>
                setProduct({ ...product, storeId: e.target.value })
              }
              required
            >
              <option value="">Choose your store</option>
              {stores.map((s) => (
                <option value={s._id} key={s._id}>
                  {s.name}
                </option>
              ))}
            </select>
            {["name", "description", "category", "price", "stock", "image"].map(
              (k) => (
                <div className="mb-2" key={k}>
                  <label className="form-label text-capitalize">{k}</label>
                  <input
                    className="form-control"
                    value={product[k]}
                    onChange={(e) =>
                      setProduct({ ...product, [k]: e.target.value })
                    }
                    required={["name", "price"].includes(k)}
                  />
                </div>
              ),
            )}
            <button className="btn btn-success" disabled={!stores.length}>
              Add product
            </button>
          </form>
        </div>
      </div>
      <div className="form-card mt-4">
        <h2 className="h5 fw-bold">Your stores</h2>
        {stores.map((s) => (
          <div
            className="d-flex justify-content-between border-bottom py-2"
            key={s._id}
          >
            <span>{s.name}</span>
            <span className="pill">
              {s.isApproved ? "Approved" : "Pending approval"}
            </span>
          </div>
        ))}
      </div>
      <div className="form-card mt-4">
        <h2 className="h5 fw-bold">Incoming orders</h2>
        {orders.map((o) => (
          <div
            className="d-flex flex-wrap justify-content-between align-items-center border-bottom py-3 gap-2"
            key={o._id}
          >
            <div>
              <strong>{o.orderNumber}</strong>
              <div className="small muted">
                {o.customer?.name} · BHD {o.total.toFixed(3)} · {o.status}
              </div>
            </div>
            <div className="d-flex gap-2">
              <select
                className="form-select form-select-sm"
                defaultValue=""
                onChange={(e) =>
                  e.target.value && status(o._id, e.target.value)
                }
              >
                <option value="">Update status</option>
                {[
                  "accepted",
                  "preparing",
                  "out_for_delivery",
                  "delivered",
                  "cancelled",
                ].map((x) => (
                  <option key={x} value={x}>
                    {x.replaceAll("_", " ")}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
        {!orders.length && <p className="muted">No orders yet.</p>}
      </div>
    </div>
  );
}
export default OwnerDashboard