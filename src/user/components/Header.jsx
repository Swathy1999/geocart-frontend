import { Link, NavLink } from "react-router-dom";
import { useShare } from "../../contextApi/ShareContext";
import React from "react";

function Header() {
  const { user, cart, logout } = useShare();
  return (
    <header className="site-header">
      <nav className="container navbar navbar-expand-lg py-3">
        <Link className="d-flex align-items-center gap-2 me-4" to="/">
          <span className="brand-mark">
            <i className="bi bi-geo-alt-fill" />
          </span>
          <span className="brand">GeoCart</span>
        </Link>
        <button
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="mainNav">
          <div className="navbar-nav gap-lg-3 me-auto">
            <NavLink className="nav-link" to="/">
              Discover
            </NavLink>
            <NavLink className="nav-link" to="/stores">
              Stores
            </NavLink>
            <NavLink className="nav-link" to="/products">
              Products
            </NavLink>
            <NavLink className="nav-link" to="/about">
              About
            </NavLink>
            {user?.role == "owner" && (
              <NavLink className="nav-link" to="/owner">
                My store
              </NavLink>
            )}
            {user?.role == "admin" && (
              <NavLink className="nav-link" to="/admin">
                Admin
              </NavLink>
            )}
          </div>
          <div className="d-flex align-items-center gap-3 mt-3 mt-lg-0">
            <Link to="/cart" className="btn btn-light position-relative">
              <i className="bi bi-bag me-1" />
              Cart{" "}
              <span className="badge text-bg-success ms-1">
                {cart.reduce((n, x) => n + x.quantity, 0)}
              </span>
            </Link>
            {user ? (
              <>
                <Link
                  to={
                    user.role == "customer"
                      ? "/orders"
                      : user.role == "owner"
                        ? "/owner"
                        : "/admin"
                  }
                  className="small fw-bold text-dark"
                >
                  Hi, {user.name.split(" ")[0]}
                </Link>
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={logout}
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="small fw-bold text-dark">
                  Sign in
                </Link>
                <Link to="/register" className="btn btn-success btn-sm">
                  Join GeoCart
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
