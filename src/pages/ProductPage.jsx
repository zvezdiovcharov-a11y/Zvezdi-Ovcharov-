import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "../router.jsx";
import { useCart } from "../context/CartContext.jsx";
import { formatPrice } from "../utils/format.js";
import Lightbox from "../components/Lightbox.jsx";
import { useSEO, truncateForMeta, SITE_URL, encodeImagePath } from "../hooks/useSEO.js";

export default function ProductPage({ product }) {
  useSEO({
    title: `${product.title} - ${product.subtitle} | Разсадник Звезди`,
    description: truncateForMeta(product.description),
    path: `/product/${product.id}`,
    image: product.image,
    noindex: !product.available,
  });

  const productUrl = `${SITE_URL}/product/${product.id}`;

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: truncateForMeta(product.description, 500),
    image: `${SITE_URL}${encodeImagePath(product.image)}`,
    sku: product.id,
    category: product.category,
    url: productUrl,
    brand: { "@type": "Brand", name: "Разсадник Звезди Овчаров" },
    offers: {
      "@type": "Offer",
      url: productUrl,
      priceCurrency: "EUR",
      price: product.price,
      availability: product.available
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Начало", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: product.category, item: `${SITE_URL}/#products` },
      { "@type": "ListItem", position: 3, name: product.title, item: productUrl },
    ],
  };

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

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
