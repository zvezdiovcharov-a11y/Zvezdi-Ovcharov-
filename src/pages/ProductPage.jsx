import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "../router.jsx";
import { useCart } from "../context/CartContext.jsx";
import { formatPrice } from "../utils/format.js";
import Lightbox from "../components/Lightbox.jsx";

export default function ProductPage({ product }) {
  const { addToCart } = useCart();
  const [lightboxIndex, setLightboxIndex] = useState(null);

  return (
    <section className="section product-page">
      <Link to="/#products" className="back-link">
        <ArrowLeft size={16} /> Обратно към продуктите
      </Link>

      <div className="product-page-layout">
        <div className="product-page-title-block">
          <p className="category">{product.category}</p>
          <h1>{product.title}</h1>
        </div>

        <div className="product-page-gallery">
          <div className="gallery">
            {product.gallery.map((image, index) => (
              <button
                type="button"
                className={index === 0 ? "gallery-thumb gallery-thumb-primary" : "gallery-thumb"}
                key={image}
                onClick={() => setLightboxIndex(index)}
                aria-label={`Виж ${product.title} на цял екран - снимка ${index + 1}`}
              >
                <img
                  src={image}
                  alt={`${product.title} - снимка ${index + 1}`}
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
                {index === 0 && product.gallery.length > 1 && (
                  <span className="gallery-more-badge">+{product.gallery.length - 1} снимки</span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="product-page-info">
          <p className="product-page-subtitle">{product.subtitle}</p>
          <p className="product-page-price">
            {product.available
              ? `${formatPrice(product.price)}${product.unit ? ` / ${product.unit}` : ""}`
              : product.badge}
          </p>
          <p>{product.description}</p>
          <ul>
            {product.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
          <button type="button" disabled={!product.available} onClick={() => addToCart(product)}>
            {product.available ? "Добави в количката" : "Временно не е наличен"}
          </button>
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={product.gallery}
          index={lightboxIndex}
          alt={product.title}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </section>
  );
}
