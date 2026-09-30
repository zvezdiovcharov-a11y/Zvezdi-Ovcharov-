import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "../router.jsx";
import { galleryImages } from "../data/gallery.js";
import Lightbox from "../components/Lightbox.jsx";
import { useSEO } from "../hooks/useSEO.js";

export default function GalleryPage() {
  useSEO({
    title: "Галерия със снимки от разсадника | Разсадник Звезди",
    description: "Реални снимки от насажденията, контейнерите и плодовете на разсадник Звезди Овчаров.",
    path: "/gallery",
  });

  const [lightboxIndex, setLightboxIndex] = useState(null);

  return (
    <section className="section gallery-page">
      <Link to="/#guides" className="back-link">
        <ArrowLeft size={16} /> Обратно към съветите
      </Link>

      <div className="section-heading">
        <p className="eyebrow">Насажденията ни</p>
        <h1>Реални снимки от разсадника</h1>
      </div>

      <div className="gallery-page-grid">
        {galleryImages.map((image, index) => (
          <button
            type="button"
            className="gallery-thumb"
            key={image}
            onClick={() => setLightboxIndex(index)}
            aria-label={`Виж снимка ${index + 1} на цял екран`}
          >
            <img src={image} alt={`Разсадник Звезди - снимка ${index + 1}`} loading="lazy" decoding="async" />
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={galleryImages}
          index={lightboxIndex}
          alt="Разсадник Звезди"
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </section>
  );
}
