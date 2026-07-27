import React from "react";
import { Mail, MessageCircle, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div>
        <strong>Разсадник Звезда Овчаров</strong>
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
    </footer>
  );
}
