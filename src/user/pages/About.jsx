import React from 'react'

function About() {
  return (
    <div className="container page-wrap">
      <div className="hero">
        <div className="hero-inner p-4 p-lg-5">
          <div className="eyebrow">A marketplace with a local heart</div>
          <h1 className="mt-3">Small businesses deserve a big place online.</h1>
          <p className="hero-copy mt-3">
            GeoCart brings neighbourhood shops and the people who live around
            them closer together. Discover independent stores, shop their
            products and arrange local delivery in one simple place.
          </p>
        </div>
      </div>
      <div className="row g-4 mt-4">
        <div className="col-md-4">
          <h3 className="h5 fw-bold">Discover</h3>
          <p className="muted">
            Explore approved stores and products from your neighbourhood.
          </p>
        </div>
        <div className="col-md-4">
          <h3 className="h5 fw-bold">Shop local</h3>
          <p className="muted">
            Keep everyday spending connected to independent businesses.
          </p>
        </div>
        <div className="col-md-4">
          <h3 className="h5 fw-bold">Deliver nearby</h3>
          <p className="muted">
            Stores define their own delivery radius, fees and minimum order.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About