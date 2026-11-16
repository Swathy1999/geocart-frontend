import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./user/components/Header";
import Footer from "./component/Footer"
import Home from "./user/pages/Home";
import Stores from "./user/pages/Stores";
import Products from "./user/pages/Products";
import StoreDetails from "./user/pages/StoreDetails";
import Favorites from "./user/pages/Favorites";
import Cart from "./user/pages/Cart";
import Orders from "./user/pages/Orders";
import About from "./user/pages/About";
import Auth from "./pages/Auth";
import Pnf from "./pages/Pnf";
import RouteGuard from "./contextApi/RouteGuard";
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminResource from "./admin/pages/AdminResource";
import AdminSettings from "./admin/pages/AdminSettings";
import OwnerDashboard from "./user/pages/OwnerDashboard";
function Layout() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stores" element={<Stores />} />
        <Route path="/stores/:id" element={<StoreDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/orders"
          element={
            <RouteGuard roles={["customer"]}>
              <Orders />
            </RouteGuard>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Auth mode="login" />} />
        <Route path="/register" element={<Auth mode="register" />} />
        <Route
          path="/owner"
          element={
            <RouteGuard roles={["owner"]}>
              <OwnerDashboard />
            </RouteGuard>
          }
        />
        <Route
          path="/admin"
          element={
            <RouteGuard roles={["admin"]}>
              <AdminDashboard />
            </RouteGuard>
          }
        />
        <Route
          path="/admin/resources"
          element={
            <RouteGuard roles={["admin"]}>
              <AdminResource />
            </RouteGuard>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <RouteGuard roles={["admin"]}>
              <AdminSettings />
            </RouteGuard>
          }
        />
        <Route path="*" element={<Pnf />} />
      </Routes>
      <Footer />
    </>
  );
}
export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
