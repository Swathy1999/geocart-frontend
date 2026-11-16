import { createContext, useContext, useEffect, useMemo, useState } from "react";
import api from "../api/axiosInstance";
const ShareContext = createContext(null);
export function ShareProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("geocart_user"));
    } catch {
      return null;
    }
  });
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("geocart_cart")) || [];
    } catch {
      return [];
    }
  });
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("geocart_favorites")) || [];
    } catch {
      return [];
    }
  });
  useEffect(() => {
    localStorage.setItem("geocart_cart", JSON.stringify(cart));
  }, [cart]);
  useEffect(() => {
    localStorage.setItem("geocart_favorites", JSON.stringify(favorites));
  }, [favorites]);
  const saveSession = (data) => {
    localStorage.setItem("geocart_token", data.token);
    localStorage.setItem("geocart_user", JSON.stringify(data.user));
    setUser(data.user);
  };
  const login = async (form) => {
    const { data } = await api.post("/auth/login", form);
    saveSession(data);
    return data.user;
  };
  const register = async (form) => {
    const { data } = await api.post("/auth/register", form);
    saveSession(data);
    return data.user;
  };
  const logout = () => {
    localStorage.removeItem("geocart_token");
    localStorage.removeItem("geocart_user");
    setUser(null);
    setCart([]);
  };
  const addToCart = (product, store) => {
    setCart((old) => {
      if (old.length && String(old[0].storeId) !== String(store._id))
        return old;
      const found = old.find((x) => x.product._id === product._id);
      return found
        ? old.map((x) =>
            x.product._id === product._id
              ? { ...x, quantity: x.quantity + 1 }
              : x,
          )
        : [
            ...old,
            { product, storeId: store._id, storeName: store.name, quantity: 1 },
          ];
    });
  };
  const changeQty = (id, quantity) =>
    setCart((old) =>
      old.map((x) =>
        x.product._id === id ? { ...x, quantity: Math.max(1, quantity) } : x,
      ),
    );
  const removeCartItem = (id) =>
    setCart((old) => old.filter((x) => x.product._id !== id));
  const toggleFavorite = (id) =>
    setFavorites((old) =>
      old.includes(id) ? old.filter((x) => x !== id) : [...old, id],
    );
  const value = useMemo(
    () => ({
      user,
      cart,
      favorites,
      login,
      register,
      logout,
      addToCart,
      changeQty,
      removeCartItem,
      toggleFavorite,
      setCart,
    }),
    [user, cart, favorites],
  );
  return (
    <ShareContext.Provider value={value}>{children}</ShareContext.Provider>
  );
}
export const useShare = () => useContext(ShareContext);
