import React from "react";
import { Link } from "../router.jsx";
import { useCart } from "../context/CartContext.jsx";
import { formatPrice } from "../utils/format.js";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const href = `/product/${product.id}`;

  return (
    <article className="product-card">
      <Link to={href} className="image-button">
        <img
          src={product.image}
          alt={`${product.title} - ${product.subtitle}`}
          loading="lazy"
          decoding="async"
        />
        <span>{product.badge}</span>
      </Link>
      <div className="product-body">
        <p className="category">{product.category}</p>
        <h3>
          <Link to={href} className="product-title-link">
            {product.title}
          </Link>
        </h3>
        <p>{product.subtitle}</p>
        <div className="card-footer">
          <strong>
            {product.available
              ? `${formatPrice(product.price)}${product.unit ? ` / ${product.unit}` : ""}`
              : product.badge}
          </strong>
          {product.available ? (
            <button type="button" onClick={() => addToCart(product)}>
              Добави
            </button>
          ) : (
            <a href="tel:0877779963" className="inquiry-link">
              Запитване
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
