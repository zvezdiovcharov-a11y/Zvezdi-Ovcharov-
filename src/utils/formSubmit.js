const FALLBACK_EMAIL = "zvezdi.ovcharov@gmail.com";

export function submitOrderForm(formElement) {
  const formData = new FormData(formElement);
  const body = new URLSearchParams(formData).toString();

  return fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
}

const MAILTO_FIELDS = ["Име", "Фамилия", "Телефон", "Куриерска фирма", "Адрес", "Допълнителна информация"];

export function buildMailtoFallback(formData, orderSummaryText) {
  const lines = MAILTO_FIELDS.map((field) => `${field}: ${formData.get(field) || ""}`);
  const body = [...lines, "", "Поръчка:", orderSummaryText].join("\n");

  return `mailto:${FALLBACK_EMAIL}?subject=${encodeURIComponent(
    "Нова поръчка от Разсадник Звезди",
  )}&body=${encodeURIComponent(body)}`;
}
