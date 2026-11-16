import { Link, useNavigate } from "react-router-dom";
import React,{ useState } from "react";
import { useShare } from "../../contextApi/ShareContext";
import { createOrder } from "../../api/apiService";
function Cart() {
  const { cart, changeQty, removeCartItem, setCart, user } = useShare();
  const [address, setAddress] = useState(""),
    [phone, setPhone] = useState(user?.phone || ""),
    [notes, setNotes] = useState(""),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false);
  const nav = useNavigate();
  const subtotal = cart.reduce((n, x) => n + x.product.price * x.quantity, 0);
  const submit = async () => {
    if (!user) {
      nav("/login");
      return;
    }
    if (!address.trim()) {
      setError("Please enter your delivery address.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      await createOrder({
        storeId: cart[0].storeId,
        items: cart.map((x) => ({
          productId: x.product._id,
          quantity: x.quantity,
        })),
        deliveryAddress: address,
        customerPhone: phone,
        notes,
      });
      setCart([]);
      nav("/orders");
    } catch (e) {
      setError(e.response?.data?.message || "Order could not be placed");
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="container page-wrap">
      <div className="section-kicker">Almost there</div>
      <h1 className="section-title">Your cart</h1>
      {!cart.length ? (
        <div className="empty-state mt-4">
          <i className="bi bi-bag fs-1 d-block mb-2" />
          Your cart is waiting for something local.
          <div>
            <Link className="btn btn-success mt-3" to="/products">
              Explore products
            </Link>
          </div>
        </div>
      ) : (
        <div className="row g-4 mt-1">
          <div className="col-lg-7">
            {cart.map((x) => (
              <div
                className="d-flex gap-3 align-items-center bg-white border rounded-4 p-3 mb-2"
                key={x.product._id}
              >
                <img
                  src={
                    x.product.image ||
                    "https://images.unsplash.com/photo-1542838132-92c53300491e?w=200"
                  }
                  style={{
                    width: 82,
                    height: 82,
                    objectFit: "cover",
                    borderRadius: 12,
                  }}
                />
                <div className="flex-grow-1">
                  <strong>{x.product.name}</strong>
                  <div className="small muted">
                    {x.storeName} · BHD {Number(x.product.price).toFixed(3)}
                  </div>
                  <div className="d-flex align-items-center gap-2 mt-2">
                    <button
                      className="btn btn-light btn-sm"
                      onClick={() => changeQty(x.product._id, x.quantity - 1)}
                    >
                      -
                    </button>
                    <span>{x.quantity}</span>
                    <button
                      className="btn btn-light btn-sm"
                      onClick={() => changeQty(x.product._id, x.quantity + 1)}
                    >
                      +
                    </button>
                    <button
                      className="btn btn-link text-danger btn-sm"
                      onClick={() => removeCartItem(x.product._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <strong>BHD {(x.product.price * x.quantity).toFixed(3)}</strong>
              </div>
            ))}
          </div>
          <div className="col-lg-5">
            <div className="form-card">
              <h2 className="h5 fw-bold">Delivery details</h2>
              <label className="form-label mt-2">Delivery address</label>
              <textarea
                className="form-control"
                rows="2"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Building, road, block and area"
              />
              <label className="form-label mt-3">Contact phone</label>
              <input
                className="form-control"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <label className="form-label mt-3">Notes (optional)</label>
              <textarea
                className="form-control"
                rows="2"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
              <hr />
              <div className="d-flex justify-content-between">
                <span>Subtotal</span>
                <strong>BHD {subtotal.toFixed(3)}</strong>
              </div>
              <div className="small muted mt-1">
                Delivery fee is added by the store at checkout.
              </div>
              {error && <div className="alert alert-danger mt-3">{error}</div>}
              <button
                className="btn btn-success w-100 mt-3"
                disabled={busy}
                onClick={submit}
              >
                {busy ? "Placing order…" : "Place cash-on-delivery order"}
              </button>
              <div className="small muted text-center mt-2">
                One order is placed with one store at a time.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart
