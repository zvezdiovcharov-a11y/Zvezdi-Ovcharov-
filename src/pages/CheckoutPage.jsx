import React, { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Link } from "../router.jsx";
import CustomSelect from "../components/CustomSelect.jsx";
import { useCart } from "../context/CartContext.jsx";
import { formatPrice } from "../utils/format.js";
import { submitOrderForm } from "../utils/formSubmit.js";
import { validateOrderForm } from "../utils/validate.js";

function orderText(cart) {
  return cart
    .map(
      (item) =>
        `${item.title} - ${item.subtitle} | ${item.quantity} x ${formatPrice(item.price)} | ${formatPrice(
          item.quantity * item.price,
        )}`,
    )
    .join("\n");
}

export default function CheckoutPage() {
  const { cart, totals, clearCart } = useCart();
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});
  const [courier, setCourier] = useState("Еконт");

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const validationErrors = validateOrderForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    setStatus("sending");
    submitOrderForm(form)
      .then((response) => {
        if (!response.ok) throw new Error("FormSubmit error");
        setStatus("sent");
        clearCart();
      })
      .catch(() => {
        setStatus("error");
      });
  }

  if (status === "sent") {
    return (
      <section className="section checkout-page">
        <div className="success-box">
          <CheckCircle2 size={40} />
          <h1>Поръчката е изпратена</h1>
          <p>Ще се свържем с Вас за потвърждение.</p>
          <Link to="/" className="primary-action">
            Обратно към началото
          </Link>
        </div>
      </section>
    );
  }

  if (cart.length === 0) {
    return (
      <section className="section checkout-page">
        <div className="empty-cart">
          <p>Кошницата е празна - няма какво да се поръча.</p>
          <Link to="/#products" className="primary-action">
            Разгледай продуктите
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section checkout-page">
      <div className="section-heading">
        <p className="eyebrow">Поръчка</p>
        <h1>Данни за доставка</h1>
      </div>

      <div className="checkout-layout">
        <div className="checkout-summary">
          <h2>Вашата поръчка</h2>
          <div className="cart-items">
            {cart.map((item) => (
              <div className="cart-item cart-item-readonly" key={item.id}>
                <img src={item.image} alt={item.title} />
                <div>
                  <h3>{item.title}</h3>
                  <p>
                    {item.quantity} x {formatPrice(item.price)}
                  </p>
                </div>
                <strong>{formatPrice(item.price * item.quantity)}</strong>
              </div>
            ))}
          </div>
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
        </div>

        <form className="checkout-form" method="POST" onSubmit={handleSubmit}>
          <p className="hidden-field" aria-hidden="true">
            <label>
              Не попълвайте това поле
              <input name="_honey" tabIndex={-1} autoComplete="off" />
            </label>
          </p>

          <div className="form-grid">
            <label>
              Име
              <input
                name="Име"
                autoComplete="given-name"
                required
                className={errors["Име"] ? "invalid" : ""}
              />
              {errors["Име"] && <span className="field-error">{errors["Име"]}</span>}
            </label>
            <label>
              Фамилия
              <input
                name="Фамилия"
                autoComplete="family-name"
                required
                className={errors["Фамилия"] ? "invalid" : ""}
              />
              {errors["Фамилия"] && <span className="field-error">{errors["Фамилия"]}</span>}
            </label>
          </div>
          <label>
            Телефон
            <input
              name="Телефон"
              type="tel"
              autoComplete="tel"
              required
              className={errors["Телефон"] ? "invalid" : ""}
            />
            {errors["Телефон"] && <span className="field-error">{errors["Телефон"]}</span>}
          </label>
          <label>
            Куриерска фирма
            <CustomSelect name="Куриерска фирма" options={["Еконт", "Спиди"]} value={courier} onChange={setCourier} />
          </label>
          <label>
            Адрес за доставка
            <textarea
              name="Адрес"
              autoComplete="street-address"
              required
              className={errors["Адрес"] ? "invalid" : ""}
            />
            {errors["Адрес"] && <span className="field-error">{errors["Адрес"]}</span>}
          </label>
          <label>
            Допълнителна информация
            <textarea name="Допълнителна информация" />
          </label>

          <input type="hidden" name="Покупки от кошницата" value={orderText(cart)} />
          <input type="hidden" name="Междинна сума" value={formatPrice(totals.subtotal)} />
          <input type="hidden" name="Отстъпка" value={formatPrice(totals.discount)} />
          <input type="hidden" name="Обща сума" value={formatPrice(totals.total)} />
          <input type="hidden" name="_subject" value="Нова поръчка от Разсадник Звезда" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_template" value="table" />

          {status === "error" && (
            <p className="form-error">
              Възникна проблем при изпращането. Моля, опитайте отново или се обадете на 0877779963.
            </p>
          )}

          <button className="submit-order" type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Изпращане..." : "Изпрати поръчката"}
          </button>
        </form>
      </div>
    </section>
  );
}
