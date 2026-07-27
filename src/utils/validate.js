const NAME_PATTERN = /^[A-Za-zА-Яа-яЁёÀ-ÿ\s-]{2,40}$/;
const PHONE_PATTERN = /^(\+359|0)[0-9]{8,9}$/;

export function validateOrderForm(formData) {
  const errors = {};

  const firstName = (formData.get("Име") || "").trim();
  const lastName = (formData.get("Фамилия") || "").trim();
  const phone = (formData.get("Телефон") || "").trim().replace(/[\s()-]/g, "");
  const address = (formData.get("Адрес") || "").trim();

  if (!NAME_PATTERN.test(firstName)) {
    errors["Име"] = "Въведете валидно име (само букви, поне 2 символа).";
  }
  if (!NAME_PATTERN.test(lastName)) {
    errors["Фамилия"] = "Въведете валидна фамилия (само букви, поне 2 символа).";
  }
  if (!PHONE_PATTERN.test(phone)) {
    errors["Телефон"] = "Въведете валиден телефон, напр. 0877779963 или +359877779963.";
  }
  if (address.length < 8) {
    errors["Адрес"] = "Въведете пълен адрес за доставка (поне 8 символа).";
  }

  return errors;
}
