import { Link } from "react-router-dom";
import React from "react";

function Pnf() {
  return (
    <div className="container page-wrap text-center">
      <div className="display-1 fw-bold text-success">404</div>
      <h1 className="h3">This page took a wrong turn.</h1>
      <p className="muted">Let's get you back to the neighbourhood.</p>
      <Link className="btn btn-success" to="/">
        Back to GeoCart
      </Link>
    </div>
  );
}

export default Pnf;
