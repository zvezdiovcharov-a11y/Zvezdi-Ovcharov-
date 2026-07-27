import React from "react";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { Link } from "../router.jsx";

export default function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="footer-top">
        <div>
          <strong>Разсадник Звезди Овчаров</strong>
          <p>Разсад ягоди, малини, къпини, касис и боровинки. Доставка чрез куриер в цяла България.</p>
        </div>
        <div className="footer-actions">
          <a href="tel:0877779963">
            <Phone size={18} /> 0877779963
          </a>
          <a href="mailto:zvezdi.ovcharov@gmail.com">
            <Mail size={18} /> Имейл
          </a>
          <a href="https://wa.me/359877779963">
            <MessageCircle size={18} /> WhatsApp
          </a>
        </div>
      </div>
      <div className="footer-legal">
        <Link to="/obshti-uslovia">Общи условия</Link>
        <Link to="/politika-za-poveritelnost">Политика за поверителност</Link>
      </div>
    </footer>
  );
}
