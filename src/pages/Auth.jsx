import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useShare } from "../contextApi/ShareContext";
 function Auth({ mode }) {
  const isLogin = mode == "login";
  const { login, register } = useShare();
  const nav = useNavigate();
  const [form, setForm] = useState({
      name: "",
      email: "",
      password: "",
      phone: "",
      role: "customer",
    }),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false);
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const u = isLogin
        ? await login({ email: form.email, password: form.password })
        : await register(form);
      nav(u.role == "admin" ? "/admin" : u.role == "owner" ? "/owner" : "/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Could not complete your request",
      );
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="container page-wrap">
      <div className="auth-shell">
        <div className="form-card">
          <div className="text-center mb-4">
            <span className="brand-mark mx-auto mb-3">
              <i className="bi bi-geo-alt-fill" />
            </span>
            <h1 className="h3 fw-bold">
              {isLogin ? "Welcome back" : "Join your neighbourhood"}
            </h1>
            <p className="muted">
              {isLogin
                ? "Sign in to continue with GeoCart."
                : "Create your free GeoCart account."}
            </p>
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={submit}>
            {!isLogin && (
              <>
                <label className="form-label">Full name</label>
                <input
                  className="form-control mb-3"
                  name="name"
                  value={form.name}
                  onChange={change}
                  required
                />
                <label className="form-label">Phone</label>
                <input
                  className="form-control mb-3"
                  name="phone"
                  value={form.phone}
                  onChange={change}
                />
                <label className="form-label">I want to</label>
                <select
                  className="form-select mb-3"
                  name="role"
                  value={form.role}
                  onChange={change}
                >
                  <option value="customer">Shop as a customer</option>
                  <option value="owner">Register as a store owner</option>
                </select>
              </>
            )}
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control mb-3"
              name="email"
              value={form.email}
              onChange={change}
              required
            />
            <label className="form-label">Password</label>
            <input
              type="password"
              minLength="8"
              className="form-control mb-4"
              name="password"
              value={form.password}
              onChange={change}
              required
            />
            <button className="btn btn-success w-100" disabled={busy}>
              {busy ? "Please wait…" : isLogin ? "Sign in" : "Create account"}
            </button>
          </form>
          <p className="text-center small mt-3 mb-0">
            {isLogin ? (
              <>
                New to GeoCart? <Link to="/register">Create an account</Link>
              </>
            ) : (
              <>
                Already registered? <Link to="/login">Sign in</Link>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
export default Auth
