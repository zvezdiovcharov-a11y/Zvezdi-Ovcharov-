export function submitNetlifyForm(formElement) {
  const data = new URLSearchParams(new FormData(formElement)).toString();

  return fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: data,
  });
}
