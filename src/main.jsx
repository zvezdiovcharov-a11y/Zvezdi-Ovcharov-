import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "./router.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import App from "./App.jsx";
import "./styles.css";

createRoot(document.getElementById("root")).render(
  <RouterProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </RouterProvider>,
);
