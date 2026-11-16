import React,{ useEffect, useState } from "react";
import { getStores } from "../../api/apiService";
import StoreCard from "../components/StoreCard";
function Stores() {
  const [stores, setStores] = useState([]),
    [q, setQ] = useState(""),
    [error, setError] = useState("");
  useEffect(() => {
    getStores()
      .then((r) => setStores(r.data.stores))
      .catch((e) =>
        setError(e.response?.data?.message || "Unable to load stores"),
      );
  }, []);
  const nearMe = () => {
    if (!navigator.geolocation) {
      setError("Location is not supported by this browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (p) => {
        try {
          const r = await getStores({
            lat: p.coords.latitude,
            lng: p.coords.longitude,
            radius: 25000,
          });
          setStores(r.data.stores);
          setError("Showing approved stores nearest to your location.");
        } catch (e) {
          setError(e.response?.data?.message || "Nearby search failed");
        }
      },
      () =>
        setError(
          "Location permission was not granted. You can still search by area.",
        ),
    );
  };
  const visible = stores.filter((s) =>
    `${s.name} ${s.category} ${s.address}`
      .toLowerCase()
      .includes(q.toLowerCase()),
  );
  return (
    <div className="container page-wrap">
      <div className="section-kicker">Shop independent</div>
      <h1 className="section-title">Explore local stores</h1>
      <p className="muted">
        Find neighbourhood businesses and see what they deliver.
      </p>
      <div className="d-flex gap-2 my-4">
        <input
          className="form-control"
          placeholder="Search by store, category or area"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <button
          className="btn btn-outline-success text-nowrap"
          onClick={nearMe}
        >
          <i className="bi bi-crosshair me-1" />
          Near me
        </button>
      </div>
      {error && <div className="alert alert-warning">{error}</div>}
      <div className="row g-3">
        {visible.map((s) => (
          <div className="col-md-6 col-lg-4" key={s._id}>
            <StoreCard store={s} />
          </div>
        ))}
      </div>
      {!visible.length && (
        <div className="empty-state mt-3">No stores match that search.</div>
      )}
    </div>
  );
}
export default Stores;
