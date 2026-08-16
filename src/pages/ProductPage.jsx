import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "../router.jsx";
import { useCart } from "../context/CartContext.jsx";
import { formatPrice } from "../utils/format.js";
import Lightbox from "../components/Lightbox.jsx";

export default function ProductPage({ product }) {
  const { addToCart } = useCart();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const hasMultipleImages = product.gallery.length > 1;

  useEffect(() => {
    setSelectedIndex(0);
    setLightboxIndex(null);
  }, [product.id]);

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
          <button
            type="button"
            className="product-gallery-main"
            onClick={() => setLightboxIndex(selectedIndex)}
            aria-label={`Виж ${product.title} на цял екран - снимка ${selectedIndex + 1}`}
          >
            <img
              src={product.gallery[selectedIndex]}
              alt={`${product.title} - снимка ${selectedIndex + 1}`}
              loading="eager"
              decoding="async"
            />
          </button>

          {hasMultipleImages && (
            <div className="product-gallery-thumbs">
              {product.gallery.map((image, index) => (
                <button
                  type="button"
                  key={image}
                  className={
                    index === selectedIndex ? "product-gallery-thumb is-active" : "product-gallery-thumb"
                  }
                  onClick={() => setSelectedIndex(index)}
                  aria-label={`Покажи снимка ${index + 1} от ${product.title}`}
                  aria-current={index === selectedIndex}
                >
                  <img
                    src={image}
                    alt={`${product.title} - миниатюра ${index + 1}`}
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              ))}
            </div>
          )}
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
