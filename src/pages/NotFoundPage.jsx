import React from "react";
import { Link } from "../router.jsx";

export default function NotFoundPage() {
  return (
    <section className="section not-found-page">
      <p className="eyebrow">404</p>
      <h1>Страницата не е намерена</h1>
      <p>Продуктът или статията, която търсите, вече не съществува или адресът е сгрешен.</p>
      <Link to="/" className="primary-action">
        Обратно към началото
      </Link>
    </section>
  );
}
