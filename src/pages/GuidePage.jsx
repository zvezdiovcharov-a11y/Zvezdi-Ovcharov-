import React from "react";
import { Link } from "../router.jsx";

export default function GuidePage({ guide }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.excerpt,
    image: `https://razsadnik-zvezda.netlify.app${guide.image}`,
    author: { "@type": "Organization", name: "Разсадник Звезди Овчаров" },
    publisher: { "@type": "Organization", name: "Разсадник Звезди Овчаров" },
    mainEntityOfPage: `https://razsadnik-zvezda.netlify.app/guide/${guide.slug}`,
  };

  return (
    <article className="article-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section
        className="article-hero"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(10, 26, 17, 0.2), rgba(8, 18, 12, 0.86)), url("${guide.image}")`,
        }}
      >
        <div className="article-hero-content">
          <p className="eyebrow">Грижа</p>
          <h1>{guide.title}</h1>
          <p className="article-excerpt">{guide.excerpt}</p>
        </div>
      </section>

      <div className="article-body-wrap">
        <div className="article-body">
          {guide.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </section>
          ))}
        </div>

        <div className="article-cta">
          <p>Готови ли сте да засадите? Разгледайте наличните разсади в каталога.</p>
          <Link to="/#products" className="primary-action">
            Виж продуктите
          </Link>
        </div>
      </div>
    </article>
  );
}
