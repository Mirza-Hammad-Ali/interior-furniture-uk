import { createContext, useContext, useState, useEffect } from "react";
const Ctx = createContext();
export const useApp = () => useContext(Ctx);
export const gbp = (n) =>
  "£" +
  Number(n).toLocaleString("en-GB", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
export const api = async (path, opt = {}, token) => {
  const r = await fetch("/api" + path, {
    ...opt,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: "Bearer " + token } : {}),
    },
    body: opt.body && JSON.stringify(opt.body),
  });
  const d = await r.json().catch(() => ({}));
  if (!r.ok)
    throw Error(d.error || "Something went wrong. Is the backend running?");
  return d;
};
const ls = (k, f) => {
  try {
    return JSON.parse(localStorage.getItem(k)) ?? f;
  } catch {
    return f;
  }
};
export function Provider({ children }) {
  const [user, setUser] = useState(() => ls("if-user", null)),
    [cart, setCart] = useState(() => ls("if-cart", []));
  useEffect(
    () => localStorage.setItem("if-cart", JSON.stringify(cart)),
    [cart],
  );
  useEffect(
    () => localStorage.setItem("if-user", JSON.stringify(user)),
    [user],
  );
  const add = (l) =>
    setCart((c) => {
      const k = c.findIndex(
        (x) => x.id === l.id && x.colour === l.colour && x.size === l.size,
      );
      if (k < 0) return [...c, l];
      const n = [...c];
      n[k] = { ...n[k], qty: Math.min(20, n[k].qty + l.qty) };
      return n;
    });
  const setQty = (i, q) =>
    setCart((c) =>
      q < 1
        ? c.filter((_, j) => j !== i)
        : c.map((x, j) => (j === i ? { ...x, qty: Math.min(20, q) } : x)),
    );
  const subtotal = cart.reduce((a, l) => a + l.price * l.qty, 0),
    delivery = cart.length && subtotal < 500 ? 49 : 0;
  return (
    <Ctx.Provider
      value={{
        user,
        setUser,
        logout: () => setUser(null),
        cart,
        add,
        setQty,
        clear: () => setCart([]),
        subtotal,
        delivery,
        total: subtotal + delivery,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}
