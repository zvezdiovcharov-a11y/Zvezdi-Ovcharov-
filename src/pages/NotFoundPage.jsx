import React from "react";
import { Link } from "../router.jsx";
import { useSEO } from "../hooks/useSEO.js";

export default function NotFoundPage() {
  useSEO({
    title: "Страницата не е намерена | Разсадник Звезди",
    description: "Търсената страница не съществува или адресът е сгрешен.",
    path: "/404",
    noindex: true,
  });

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
