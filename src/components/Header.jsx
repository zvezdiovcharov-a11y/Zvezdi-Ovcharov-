import React, { useEffect, useRef, useState } from "react";
import { Leaf, Menu, Phone, ShoppingBag, X } from "lucide-react";
import { Link } from "../router.jsx";
import { useCart } from "../context/CartContext.jsx";

const navLinks = [
  { label: "Начало", to: "/" },
  { label: "Продукти", to: "/#products" },
  { label: "Грижа", to: "/#guides" },
  { label: "Контакти", to: "/#contact" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    if (isMenuOpen) {
      setIsHidden(false);
      return undefined;
    }

    lastScrollY.current = window.scrollY;
    let ticking = false;

    function handleScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const scrolledDown = currentScrollY > lastScrollY.current;

        if (currentScrollY < 80) {
          setIsHidden(false);
        } else {
          setIsHidden(scrolledDown);
        }

        lastScrollY.current = currentScrollY;
        ticking = false;
      });
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMenuOpen]);

  const { totals } = useCart();

  return (
    <header className={isHidden ? "site-header header-hidden" : "site-header"}>
      <nav className="topbar" aria-label="Основна навигация">
        <Link to="/" className="brand" aria-label="Разсадник Звезда">
          <span className="brand-mark">
            <Leaf size={20} />
          </span>
          <span>Разсадник Звезда</span>
        </Link>

        <ul className={isMenuOpen ? "nav-menu open" : "nav-menu"}>
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link to={link.to} onClick={() => setIsMenuOpen(false)}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <a href="tel:0877779963" className="phone-link">
            <Phone size={18} /> 0877779963
          </a>
          <Link to="/cart" className="cart-trigger">
            <ShoppingBag size={19} />
            <span>Кошница</span>
            <strong>{totals.count}</strong>
          </Link>
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
    </header>
  );
}
