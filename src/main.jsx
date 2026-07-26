import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Leaf,
  ShoppingBag,
  Phone,
  Truck,
  Minus,
  Plus,
  X,
  MessageCircle,
  CheckCircle2,
  Sprout,
  ShieldCheck,
  Mail,
  Menu,
} from "lucide-react";
import "./styles.css";

const navLinks = [
  { label: "Начало", href: "#top" },
  { label: "Продукти", href: "#products" },
  { label: "Грижа", href: "#guides" },
  { label: "Контакти", href: "#contact" },
];

const img = (name) => `/images/${name}`;

const products = [
  {
    id: "blueberry-2",
    title: "Американска боровинка Маверик и Онийл",
    subtitle: "Двугодишна, 1.5 л контейнер + 2 л почва подарък",
    category: "Боровинки",
    price: 8,
    unit: "бр.",
    badge: "Налично",
    image: img("borovinka-2god.jpg"),
    gallery: [img("borovinka.jpg"), img("borovinka1.jpeg"), img("borovinka-2god.jpg"), img("borovinka-2god1.jpg")],
    description:
      "Киселолюбиви растения с нужда от слънчево място, добра влажност и кисела почва pH 4.0-5.5. Препоръчва се засаждане на поне два сорта за по-добро опрашване.",
    highlights: ["Маверик и Онийл", "Подходящи за градина", "Почва подарък"],
    available: true,
  },
  {
    id: "raspberry-polka-2l",
    title: "Малина Полка",
    subtitle: "Целогодишна малина, вкоренена в 2 л контейнер",
    category: "Малини",
    price: 3,
    unit: "2 л контейнер",
    badge: "Ремонтантен сорт",
    image: img("snimka5.jpg"),
    gallery: [
      img("malini polka.jpg"),
      img("malini polka1.jpg"),
      img("malini polka2.jpg"),
      img("snimka5.jpg"),
      img("malini konteiner2l.jpg"),
      img("malini konteiner0.5l.jpg"),
    ],
    description:
      "Популярен ремонтантен сорт с едри, ароматни и вкусни червени плодове. Плододава от средата на юли до есента и е подходящ за прясна консумация и производство.",
    highlights: ["Едри плодове", "Дълъг период на плододаване", "Отлично прихващане"],
    available: true,
  },
  {
    id: "raspberry-polka-05l",
    title: "Малина Полка",
    subtitle: "Вкоренена в 0.5 л контейнер",
    category: "Малини",
    price: 2,
    unit: "0.5 л контейнер",
    badge: "Компактен разсад",
    image: img("malini konteiner0.5l.jpg"),
    gallery: [img("malini konteiner0.5l.jpg"), img("malini polka.jpg"), img("malini polka1.jpg")],
    description:
      "По-малък контейнер със здраво вкоренен разсад Полка. Практичен избор за по-големи количества и засаждане в редове.",
    highlights: ["2 EUR за 0.5 л", "Подходяща за редово засаждане", "Устойчив сорт"],
    available: true,
  },
  {
    id: "blackberry-triple-crown",
    title: "Къпина Triple Crown",
    subtitle: "Тройна корона, без бодли, 2 л контейнер",
    category: "Къпини",
    price: 6,
    unit: "2 л контейнер",
    badge: "Без бодли",
    image: img("kupini.jpg"),
    gallery: [img("kupini.jpg"), img("kupini Triple crown1.jpg")],
    description:
      "Изключително устойчив сорт, лесен за отглеждане, с едри, сочни и ароматни плодове. Подходящ за прясна консумация, сладка, сосове и десерти.",
    highlights: ["Без бодли", "Едри плодове", "Лесно отглеждане"],
    available: true,
  },
  {
    id: "blackcurrant-bogatir",
    title: "Черен касис Богатир",
    subtitle: "Едроплоден сорт, 2 л контейнер",
    category: "Касис",
    price: 6,
    unit: "2 л контейнер",
    badge: "Студоустойчив",
    image: img("kasis.jpg"),
    gallery: [img("kasis.jpg"), img("kasis1.jpg")],
    description:
      "Едроплоден черен касис с мощен растеж, висока производителност и балансиран сладко-кисел вкус. Плодовете са подходящи за свежа консумация, сокове и консервиране.",
    highlights: ["Едроплоден", "До около 4 кг от развит храст", "Силен аромат"],
    available: true,
  },
  {
    id: "redcurrant",
    title: "Червен касис",
    subtitle: "Френско грозде, 2 л контейнер",
    category: "Касис",
    price: 6,
    unit: "2 л контейнер",
    badge: "Витаминозен",
    image: img("cherven kasis.jpg"),
    gallery: [img("cherven kasis.jpg"), img("cherven kasis1.jpg"), img("cherven kasis2.jpg"), img("cherven kasis3.jpg")],
    description:
      "Непретенциозен градински храст с ярки червени плодове и свеж кисел вкус. Подходящ за десерти, желета и прясна консумация.",
    highlights: ["Богат на антиоксиданти", "Слънце или лека полусянка", "Редовно плододаване"],
    available: true,
  },
  {
    id: "jostaberry",
    title: "Йоща бери",
    subtitle: "Ribes nidigrolaria, 2 л контейнер",
    category: "Други плодни",
    price: 6,
    unit: "2 л контейнер",
    badge: "Без бодли",
    image: img("ioshta.jpg"),
    gallery: [img("ioshta.jpg"), img("ioshta1.jpg")],
    description:
      "Хибрид между касис и цариградско грозде с тъмни, сочни плодове и приятен сладко-кисел вкус. Устойчив храст без бодли.",
    highlights: ["Високодобивен храст", "До 1.5-2 м", "Прясна консумация и сокове"],
    available: true,
  },
  {
    id: "honeyberry",
    title: "Майска боровинка",
    subtitle: "Lonicera kamtschatica, 2 л контейнер",
    category: "Други плодни",
    price: 6,
    unit: "2 л контейнер",
    badge: "Много ранна",
    image: img("kamtschatica.jpg"),
    gallery: [img("kamtschatica.jpg"), img("kamtschatica1.jpg")],
    description:
      "Студоустойчив овощен храст с продълговати синьо-лилави плодове. Узрява още през май и е непретенциозен за отглеждане.",
    highlights: ["Ранно плододаване", "Студоустойчивост до -40°C", "Богата на антиоксиданти"],
    available: true,
  },
  {
    id: "darselect-tray",
    title: "Ягоди Darselect",
    subtitle: "Вкоренени в табли, 70 бр.",
    category: "Ягоди",
    price: 25,
    unit: "табла 70 бр.",
    badge: "Очакват се през август",
    image: img("yagodi-darselect1.jpg"),
    gallery: [
      img("yagodi-gol-koren.jpg"),
      img("yagodi-tably1.jpg"),
      img("darselect.jpg"),
      img("darselect1.jpg"),
      img("yagodi-darselect1.jpg"),
      img("yagodi-darselect2.jpg"),
    ],
    description:
      "Френски средноранен сорт с едри конусовидни плодове, отличен аромат и много добър вкус. Подходящ за домашни и търговски насаждения.",
    highlights: ["Табла 70 бр.", "Висок добив", "Добра транспортируемост"],
    available: true,
  },
  {
    id: "strawberry-asia",
    title: "Ягода Asia",
    subtitle: "Вкоренена в табли, 70 бр.",
    category: "Ягоди",
    price: 0,
    unit: "",
    badge: "Изчерпани",
    image: img("yagodi-tably.jpg"),
    gallery: [img("yagodi-tably.jpg"), img("yagodi-asia.jpg")],
    description:
      "Много едри плодове с дълга конична форма, яркочервени, с добра устойчивост на обработка и дълъг срок на годност. Високодобивен сорт, ценен от производители с взискателни клиенти.",
    highlights: ["Едри конични плодове", "Дълъг срок на годност", "Много високи добиви"],
    available: false,
  },
  {
    id: "pineberry",
    title: "Pineberry",
    subtitle: "Бяла ягода с вкус на ананас",
    category: "Ягоди",
    price: 1,
    unit: "бр.",
    badge: "Ограничени",
    image: img("pineberry.jpg"),
    gallery: [img("pineberry.jpg")],
    description:
      "Екзотична бяла ягода с червени семена и лек ананасов аромат. Интересен сорт за градини и колекционери.",
    highlights: ["Рядък сорт", "Бели плодове", "Лек ананасов вкус"],
    available: true,
  },
  {
    id: "magnus",
    title: "Ягода Magnus",
    subtitle: "Къснозреещ сорт",
    category: "Ягоди",
    price: 0,
    unit: "",
    badge: "Очаква се през септември",
    image: img("magnus.jpg"),
    gallery: [img("magnus.jpg"), img("magnus1.jpg")],
    description:
      "Къснозреещ сорт с едри, атрактивни и сладки плодове. Удължава сезона на ягодите, когато повечето други сортове вече са приключили.",
    highlights: ["Късно узряване", "Едри плодове", "Добра устойчивост"],
    available: false,
  },
  {
    id: "blueberry-3",
    title: "Американска боровинка",
    subtitle: "Тригодишна, 15 л контейнер",
    category: "Боровинки",
    price: 0,
    unit: "",
    badge: "Изчерпани",
    image: img("borovinka-3god.jpg"),
    gallery: [img("borovinka-3god.jpg")],
    description:
      "По-голям тригодишен разсад американска боровинка. В момента е отбелязан като изчерпан.",
    highlights: ["15 л контейнер", "Голямо растение", "Очаква се нова наличност"],
    available: false,
  },
];

const guides = [
  {
    title: "Засаждане на американска боровинка",
    text: "Изберете слънчево място, кисела почва и добър дренаж. При неподходяща почва използвайте кисел торф, иглолистна постеля и мулч.",
    image: img("borovinki zasajdane.jpg"),
  },
  {
    title: "Вкисляване на почвата",
    text: "Оптималното pH за боровинки е 4.0-5.5. Винаги измервайте pH преди третиране и не прекалявайте с вкисляването.",
    image: img("vkislqvane.jpg"),
  },
  {
    title: "Реални снимки от насажденията",
    text: "В сайта са използвани снимки от наличните растения, контейнери и плодове от разсадника.",
    image: img("snimka1.jpg"),
  },
];

function formatPrice(value) {
  return new Intl.NumberFormat("bg-BG", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value);
}

function App() {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("zvezda-cart")) || [];
    } catch {
      return [];
    }
  });
  const [activeProduct, setActiveProduct] = useState(products[0]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Всички");
  const [sent, setSent] = useState(false);

  const categories = ["Всички", ...Array.from(new Set(products.map((product) => product.category)))];
  const visibleProducts =
    selectedCategory === "Всички" ? products : products.filter((product) => product.category === selectedCategory);

  const totals = useMemo(() => {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discount = subtotal >= 100 ? subtotal * 0.1 : 0;
    return { count, subtotal, discount, total: subtotal - discount };
  }, [cart]);

  const productSchema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: product.title,
          description: product.description,
          image: `https://razsadnik-zvezda.netlify.app${product.image}`,
          sku: product.id,
          category: product.category,
          offers: {
            "@type": "Offer",
            priceCurrency: "EUR",
            price: product.price,
            availability: product.available
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
            url: "https://razsadnik-zvezda.netlify.app/#products",
          },
        },
      })),
    }),
    [],
  );

  function saveCart(nextCart) {
    setCart(nextCart);
    localStorage.setItem("zvezda-cart", JSON.stringify(nextCart));
  }

  function addToCart(product) {
    if (!product.available) return;
    const nextCart = cart.some((item) => item.id === product.id)
      ? cart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      : [
          ...cart,
          {
            id: product.id,
            title: product.title,
            subtitle: product.subtitle,
            price: product.price,
            unit: product.unit,
            image: product.image,
            quantity: 1,
          },
        ];
    saveCart(nextCart);
    setIsCartOpen(true);
  }

  function changeQuantity(productId, amount) {
    const nextCart = cart
      .map((item) => (item.id === productId ? { ...item, quantity: item.quantity + amount } : item))
      .filter((item) => item.quantity > 0);
    saveCart(nextCart);
  }

  function orderText() {
    return cart
      .map(
        (item) =>
          `${item.title} - ${item.subtitle} | ${item.quantity} x ${formatPrice(item.price)} | ${formatPrice(
            item.quantity * item.price,
          )}`,
      )
      .join("\n");
  }

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    fetch(form.action, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    }).then((response) => {
      if (!response.ok) throw new Error("FormSubmit error");
      setSent(true);
      saveCart([]);
    }).catch(() => {
      alert("Възникна проблем при изпращането. Моля, опитайте отново или се обадете на 0877779963.");
    });
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <header className="site-header">
        <nav className="topbar" aria-label="Основна навигация">
          <a className="brand" href="#top" aria-label="Разсадник Звезда">
            <span className="brand-mark"><Leaf size={20} /></span>
            <span>Разсадник Звезда</span>
          </a>

          <ul className={isMenuOpen ? "nav-menu open" : "nav-menu"}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setIsMenuOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            <a href="tel:0877779963" className="phone-link"><Phone size={18} /> 0877779963</a>
            <button className="cart-trigger" type="button" onClick={() => setIsCartOpen(true)}>
              <ShoppingBag size={19} />
              <span>Кошница</span>
              <strong>{totals.count}</strong>
            </button>
            <button
              className="menu-toggle"
              type="button"
              aria-label={isMenuOpen ? "Затвори менюто" : "Отвори менюто"}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>

        <section className="hero" id="top">
          <div className="hero-copy">
            <p className="eyebrow">Директно от производител</p>
            <h1>Разсад ягоди, малини, къпини, касис и боровинки</h1>
            <p>
              Реални растения от разсадник Звезда Овчаров, подбрани за добро прихващане и доставка в цяла България.
            </p>
            <div className="hero-actions">
              <a href="#products" className="primary-action">Виж продуктите</a>
              <a href="https://wa.me/359877779963" className="secondary-action">
                <MessageCircle size={18} /> WhatsApp
              </a>
            </div>
          </div>
          <div className="hero-panel" aria-label="Акценти">
            <div><Truck size={22} /><span>Доставка в цяла България</span></div>
            <div><Sprout size={22} /><span>Вкоренени растения и контейнери</span></div>
            <div><ShieldCheck size={22} /><span>10% отстъпка над 100 EUR</span></div>
          </div>
        </section>
      </header>

      <main>
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
            <article className="product-card" key={product.id}>
              <button className="image-button" type="button" onClick={() => setActiveProduct(product)}>
                <img
                  src={product.image}
                  alt={`${product.title} - ${product.subtitle}`}
                  loading="lazy"
                  decoding="async"
                />
                <span>{product.badge}</span>
              </button>
              <div className="product-body">
                <p className="category">{product.category}</p>
                <h3>{product.title}</h3>
                <p>{product.subtitle}</p>
                <div className="card-footer">
                  <strong>{product.available ? `${formatPrice(product.price)}${product.unit ? ` / ${product.unit}` : ""}` : product.badge}</strong>
                  <button type="button" disabled={!product.available} onClick={() => addToCart(product)}>
                    {product.available ? "Добави" : "Запитване"}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="detail-section" aria-label="Подробности за продукт">
          <div className="detail-copy">
            <p className="eyebrow">Подробности</p>
            <h2>{activeProduct.title}</h2>
            <p>{activeProduct.description}</p>
            <ul>
              {activeProduct.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
            </ul>
            <button type="button" disabled={!activeProduct.available} onClick={() => addToCart(activeProduct)}>
              {activeProduct.available ? "Добави избрания продукт" : "Временно не е наличен"}
            </button>
          </div>
          <div className="gallery">
            {activeProduct.gallery.map((image, index) => (
              <img
                src={image}
                alt={`${activeProduct.title} - снимка ${index + 1}`}
                loading="lazy"
                decoding="async"
                key={image}
              />
            ))}
          </div>
        </section>

        <section className="section guide-section" id="guides">
          <div className="section-heading">
            <p className="eyebrow">Грижа</p>
            <h2>Полезна информация за засаждане</h2>
          </div>
          <div className="guide-grid">
            {guides.map((guide) => (
              <article className="guide-card" key={guide.title}>
                <img src={guide.image} alt={guide.title} loading="lazy" decoding="async" />
                <div>
                  <h3>{guide.title}</h3>
                  <p>{guide.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer" id="contact">
        <div>
          <strong>Разсадник Звезда Овчаров</strong>
          <p>Разсад ягоди, малини, къпини, касис и боровинки. Доставка чрез куриер в цяла България.</p>
        </div>
        <div className="footer-actions">
          <a href="tel:0877779963"><Phone size={18} /> 0877779963</a>
          <a href="mailto:zvezdi.ovcharov@gmail.com"><Mail size={18} /> Имейл</a>
          <a href="https://wa.me/359877779963"><MessageCircle size={18} /> WhatsApp</a>
        </div>
      </footer>

      {isCartOpen && (
        <div className="cart-overlay" role="dialog" aria-modal="true" aria-label="Кошница">
          <aside className="cart-drawer">
            <div className="cart-head">
              <div>
                <p className="eyebrow">Поръчка</p>
                <h2>Кошница и checkout</h2>
              </div>
              <button className="icon-button" type="button" onClick={() => setIsCartOpen(false)} aria-label="Затвори">
                <X size={22} />
              </button>
            </div>

            {sent ? (
              <div className="success-box">
                <CheckCircle2 size={40} />
                <h3>Поръчката е изпратена</h3>
                <p>Ще се свържем с Вас за потвърждение.</p>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.length === 0 ? (
                    <p className="empty-cart">Кошницата е празна.</p>
                  ) : (
                    cart.map((item) => (
                      <div className="cart-item" key={item.id}>
                        <img src={item.image} alt={item.title} />
                        <div>
                          <h3>{item.title}</h3>
                          <p>{item.subtitle}</p>
                          <strong>{formatPrice(item.price)} / {item.unit}</strong>
                        </div>
                        <div className="quantity">
                          <button type="button" onClick={() => changeQuantity(item.id, -1)} aria-label="Намали">
                            <Minus size={16} />
                          </button>
                          <span>{item.quantity}</span>
                          <button type="button" onClick={() => changeQuantity(item.id, 1)} aria-label="Увеличи">
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="totals">
                  <div><span>Междинна сума</span><strong>{formatPrice(totals.subtotal)}</strong></div>
                  <div><span>Отстъпка над 100 EUR</span><strong>-{formatPrice(totals.discount)}</strong></div>
                  <div className="grand-total"><span>Общо</span><strong>{formatPrice(totals.total)}</strong></div>
                </div>

                <form className="checkout-form" action="https://formsubmit.co/ajax/zvezdi.ovcharov@gmail.com" method="POST" onSubmit={handleSubmit}>
                  <div className="form-grid">
                    <label>
                      Име
                      <input name="Име" autoComplete="given-name" required />
                    </label>
                    <label>
                      Фамилия
                      <input name="Фамилия" autoComplete="family-name" required />
                    </label>
                  </div>
                  <label>
                    Телефон
                    <input name="Телефон" type="tel" autoComplete="tel" required />
                  </label>
                  <label>
                    Адрес за доставка
                    <textarea name="Адрес" autoComplete="street-address" required />
                  </label>
                  <label>
                    Допълнителна информация
                    <textarea name="Допълнителна информация" />
                  </label>
                  <input type="hidden" name="Покупки от кошницата" value={orderText()} />
                  <input type="hidden" name="Междинна сума" value={formatPrice(totals.subtotal)} />
                  <input type="hidden" name="Отстъпка" value={formatPrice(totals.discount)} />
                  <input type="hidden" name="Обща сума" value={formatPrice(totals.total)} />
                  <input type="hidden" name="_subject" value="Нова поръчка от Разсадник Звезда" />
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_template" value="table" />
                  <button className="submit-order" type="submit" disabled={cart.length === 0}>
                    Изпрати поръчката
                  </button>
                </form>
              </>
            )}
          </aside>
        </div>
      )}
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
