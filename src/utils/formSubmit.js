export function submitOrderForm(formElement) {
  const formData = new FormData(formElement);
  const body = new URLSearchParams(formData).toString();

  return fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
}
