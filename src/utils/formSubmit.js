const FORM_ENDPOINT = "https://formsubmit.co/ajax/zvezdi.ovcharov@gmail.com";

export function submitOrderForm(formElement) {
  const formData = new FormData(formElement);

  return fetch(FORM_ENDPOINT, {
    method: "POST",
    headers: { Accept: "application/json" },
    body: formData,
  });
}
