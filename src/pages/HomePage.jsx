import React, { useState } from "react";
import { MessageCircle, ShieldCheck, Sprout, Truck } from "lucide-react";
import { Link } from "../router.jsx";
import { products, categories } from "../data/products.js";
import { guides } from "../data/guides.js";
import ProductCard from "../components/ProductCard.jsx";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("Всички");

  const visibleProducts =
    selectedCategory === "Всички" ? products : products.filter((product) => product.category === selectedCategory);

  return (
    <>
      <section className="hero-banner" id="top">
        <div className="hero">
          <div className="hero-copy">
            <p className="eyebrow">Директно от производител</p>
            <h1>Разсад ягоди, малини, къпини, касис и боровинки</h1>
            <p>
              Реални растения от разсадник Звезди Овчаров, подбрани за добро прихващане и доставка в цяла България.
            </p>
            <div className="hero-actions">
              <a href="#products" className="primary-action">
                Виж продуктите
              </a>
              <a href="https://wa.me/359877779963" className="secondary-action">
                <MessageCircle size={18} /> WhatsApp
              </a>
            </div>
          </div>
          <div className="hero-panel" aria-label="Акценти">
            <div>
              <Truck size={22} />
              <span>Доставка в цяла България</span>
            </div>
            <div>
              <Sprout size={22} />
              <span>Вкоренени растения и контейнери</span>
            </div>
            <div>
              <ShieldCheck size={22} />
              <span>10% отстъпка над 100 EUR</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section intro-section">
        <div className="section-heading">
          <p className="eyebrow">Каталог</p>
          <h2>Налични и очаквани разсади</h2>
        </div>
        <div className="category-tabs" aria-label="Филтър по категория">
          {categories.map((category) => (
            <button
              type="button"
              key={category}
              className={category === selectedCategory ? "active" : ""}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className="products-grid" id="products">
        {visibleProducts.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </section>

      <section className="section guide-section" id="guides">
        <div className="section-heading">
          <p className="eyebrow">Грижа</p>
          <h2>Полезна информация за засаждане</h2>
        </div>
        <div className="guide-grid">
          {guides.map((guide) => (
            <Link to={`/guide/${guide.slug}`} className="guide-card" key={guide.slug}>
              <img src={guide.image} alt={guide.title} loading="lazy" decoding="async" />
              <div>
                <h3>{guide.title}</h3>
                <p>{guide.excerpt}</p>
              </div>
            </Link>
          ))}
          <Link to="/gallery" className="guide-card">
            <img
              src="/images/snimka1.jpg"
              alt="Реални снимки от насажденията на разсадник Звезди"
              loading="lazy"
              decoding="async"
            />
            <div>
              <h3>Реални снимки от насажденията</h3>
              <p>Разгледайте галерия със снимки от наличните растения, контейнери и плодове от разсадника.</p>
            </div>
          </Link>
        </div>
      </section>
    </>
  );
}
