import React from "react";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "../router.jsx";
import { useCart } from "../context/CartContext.jsx";
import { formatPrice } from "../utils/format.js";

export default function CartPage() {
  const { cart, totals, changeQuantity, setQuantity, removeFromCart } = useCart();

  function handleQuantityInput(event, productId) {
    const raw = event.target.value.replace(/[^\d]/g, "");
    event.target.value = raw;
  }

  function commitQuantity(event, productId) {
    const value = event.target.value;
    if (value === "") {
      event.target.value = String(cart.find((item) => item.id === productId)?.quantity ?? 1);
      return;
    }
    setQuantity(productId, value);
  }

  return (
    <section className="section cart-page">
      <div className="section-heading">
        <p className="eyebrow">Поръчка</p>
        <h1>Кошница</h1>
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <ShoppingBag size={32} />
          <p>Кошницата е празна.</p>
          <Link to="/#products" className="primary-action">
            Разгледай продуктите
          </Link>
        </div>
      ) : (
        <div className="cart-page-layout">
          <div className="cart-items">
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.title} />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.subtitle}</p>
                  <strong>
                    {formatPrice(item.price)} / {item.unit}
                  </strong>
                </div>
                <div className="quantity">
                  <button type="button" onClick={() => changeQuantity(item.id, -1)} aria-label="Намали">
                    <Minus size={16} />
                  </button>
                  <input
                    key={item.quantity}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    className="quantity-input"
                    defaultValue={item.quantity}
                    aria-label={`Количество за ${item.title}`}
                    onChange={(event) => handleQuantityInput(event, item.id)}
                    onBlur={(event) => commitQuantity(event, item.id)}
                    onFocus={(event) => event.target.select()}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") event.target.blur();
                    }}
                  />
                  <button type="button" onClick={() => changeQuantity(item.id, 1)} aria-label="Увеличи">
                    <Plus size={16} />
                  </button>
                </div>
                <button
                  type="button"
                  className="remove-item"
                  onClick={() => removeFromCart(item.id)}
                  aria-label={`Премахни ${item.title} от количката`}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="totals">
              <div>
                <span>Междинна сума</span>
                <strong>{formatPrice(totals.subtotal)}</strong>
              </div>
              <div>
                <span>Отстъпка над 100 EUR</span>
                <strong>-{formatPrice(totals.discount)}</strong>
              </div>
              <div className="grand-total">
                <span>Общо</span>
                <strong>{formatPrice(totals.total)}</strong>
              </div>
            </div>
            <Link to="/checkout" className="primary-action submit-order">
              Продължи към поръчката
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
