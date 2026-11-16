
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getStores, getProducts } from "../../api/apiService";
import StoreCard from "../components/StoreCard";
import ProductCard from "../components/ProductCard";
import Preloader from "../../component/Preloader";

function Home() {
  const [stores, setStores] = useState([]);
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState("");
  const [searching, setSearching] = useState(false);

  // Fetch stores and products
  const fetchData = async (searchQuery = "") => {
    try {
      setError("");

      const params = searchQuery
        ? { search: searchQuery }
        : {};

      const [storeResponse, productResponse] =
        await Promise.all([
          getStores(params),
          getProducts(params),
        ]);

      setStores(storeResponse.data.stores || []);

      setProducts(
        (productResponse.data.products || []).slice(0, 8)
      );

    } catch (error) {
      console.error("GeoCart API Error:", error);

      setError(
        error.response?.data?.message ||
        "Could not connect to GeoCart API."
      );

      setStores([]);
      setProducts([]);
    } finally {
      setBusy(false);
      setSearching(false);
    }
  };

  // Initial data loading
  useEffect(() => {
    fetchData();
  }, []);

  // Search functionality
  const search = () => {
    fetchData(query.trim());
    setSearching(true);
  };

  // Enter key search
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  return (
    <div className="container page-wrap">

      {/* Hero Section */}
      <section className="hero mb-5">
        <div className="hero-inner p-4 p-lg-5">

          <div className="eyebrow mb-3">
            Your neighbourhood, one cart away
          </div>

          <h1>
            Discover great local stores around you.
          </h1>

          <p className="hero-copy mt-3 mb-4">
            Fresh finds, everyday essentials and independent
            shops — all from the places that make your
            neighbourhood special.
          </p>

          {/* Search */}
          <div className="search-panel">
            <i className="bi bi-search text-success align-self-center ms-2" />

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search stores, products or categories"
            />

            <button
              className="btn btn-success"
              onClick={search}
              disabled={searching}
            >
              {searching ? "Searching..." : "Explore"}
            </button>
          </div>

          <div className="d-flex gap-3 flex-wrap mt-4 small text-white-50">

            <span>
              <i className="bi bi-shop me-1" />
              Independent stores
            </span>

            <span>
              <i className="bi bi-geo-alt me-1" />
              Local delivery areas
            </span>

            <span>
              <i className="bi bi-heart me-1" />
              Support local
            </span>

          </div>
        </div>
      </section>

      {/* Error Message */}
      {error && (
        <div className="alert alert-warning">
          {error}. Please check your backend and API settings.
        </div>
      )}

      {busy ? (
        <Preloader />
      ) : (
        <>

          {/* Stores Section */}
          <section className="mb-5">

            <div className="d-flex justify-content-between align-items-end mb-3">

              <div>
                <div className="section-kicker">
                  Neighbourhood favourites
                </div>

                <h2 className="section-title mb-0">
                  Stores around you
                </h2>
              </div>

              <Link
                to="/stores"
                className="text-success fw-bold"
              >
                All stores <i className="bi bi-arrow-right" />
              </Link>

            </div>

            <div className="row g-3">

              {stores.slice(0, 4).map((store) => (
                <div
                  className="col-md-6 col-lg-3"
                  key={store._id}
                >
                  <StoreCard store={store} />
                </div>
              ))}

              {!stores.length && (
                <div className="col-12">
                  <div className="empty-state">
                    No approved stores yet. Check back soon.
                  </div>
                </div>
              )}

            </div>
          </section>

          {/* Products Section */}
          <section>

            <div className="d-flex justify-content-between align-items-end mb-3">

              <div>
                <div className="section-kicker">
                  Picked for your day
                </div>

                <h2 className="section-title mb-0">
                  Popular products
                </h2>
              </div>

              <Link
                to="/products"
                className="text-success fw-bold"
              >
                Browse products <i className="bi bi-arrow-right" />
              </Link>

            </div>

            <div className="row g-3">

              {products.map((product) => (
                <div
                  className="col-6 col-md-4 col-lg-3"
                  key={product._id}
                >
                  <ProductCard product={product} />
                </div>
              ))}

              {!products.length && (
                <div className="col-12">
                  <div className="empty-state">
                    Products from approved stores will appear here.
                  </div>
                </div>
              )}

            </div>
          </section>

        </>
      )}

    </div>
  );
}

export default Home;
