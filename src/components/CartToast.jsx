import React, { useEffect, useState } from "react";
import { Link } from "../router.jsx";
import { useCart } from "../context/CartContext.jsx";

const DISPLAY_MS = 6000;
const EXIT_MS = 300;

function Toast({ id, message, onDone }) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const leaveTimer = setTimeout(() => setLeaving(true), DISPLAY_MS - EXIT_MS);
    return () => clearTimeout(leaveTimer);
  }, []);

  useEffect(() => {
    if (!leaving) return undefined;
    const removeTimer = setTimeout(() => onDone(id), EXIT_MS);
    return () => clearTimeout(removeTimer);
  }, [leaving, id, onDone]);

  return (
    <div className={leaving ? "cart-toast cart-toast-leaving" : "cart-toast"} role="status">
      <span>{message}</span>
      <Link to="/cart" className="cart-toast-action" onClick={() => onDone(id)}>
        Виж количката
      </Link>
    </div>
  );
}

export default function CartToastContainer() {
  const { toasts, dismissToast } = useCart();

  if (!toasts.length) return null;

  return (
    <div className="cart-toast-container">
      {toasts.map((toast) => (
        <Toast key={toast.id} id={toast.id} message={toast.message} onDone={dismissToast} />
      ))}
    </div>
  );
}
