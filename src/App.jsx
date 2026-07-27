import React, { useEffect, useMemo } from "react";
import { useRouter, matchRoute } from "./router.jsx";
import { getProductById, products } from "./data/products.js";
import { getGuideBySlug } from "./data/guides.js";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import CartToastContainer from "./components/CartToast.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import GuidePage from "./pages/GuidePage.jsx";
import GalleryPage from "./pages/GalleryPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

function Page({ route }) {
  switch (route.name) {
    case "home":
      return <HomePage />;
    case "product": {
      const product = getProductById(route.id);
      return product ? <ProductPage product={product} /> : <NotFoundPage />;
    }
    case "guide": {
      const guide = getGuideBySlug(route.slug);
      return guide ? <GuidePage guide={guide} /> : <NotFoundPage />;
    }
    case "gallery":
      return <GalleryPage />;
    case "cart":
      return <CartPage />;
    case "checkout":
      return <CheckoutPage />;
    default:
      return <NotFoundPage />;
  }
}

export default function App() {
  const { pathname, hash, fullPath } = useRouter();
  const route = matchRoute(pathname);

  useEffect(() => {
    if (hash) {
      const timer = setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 0);
      return () => clearTimeout(timer);
    }
    window.scrollTo({ top: 0 });
  }, [fullPath, hash]);

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
            availability: product.available ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            url: `https://razsadnik-zvezda.netlify.app/product/${product.id}`,
          },
        },
      })),
    }),
    [],
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <Header />
      <main>
        <Page route={route} />
      </main>
      <Footer />
      <CartToastContainer />
    </>
  );
}
