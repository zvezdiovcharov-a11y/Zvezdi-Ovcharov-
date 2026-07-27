import productsData from "./products.json";

export const products = productsData;

export const categories = ["Всички", ...Array.from(new Set(products.map((product) => product.category)))];

export function getProductById(id) {
  return products.find((product) => product.id === id);
}
