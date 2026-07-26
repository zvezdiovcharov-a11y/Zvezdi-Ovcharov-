# Разсадник Звезда

Сайт на React + Vite за онлайн каталог, количка и checkout на разсадник "Звезда Овчаров".

## Разработка

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Деплой в Netlify

Проектът вече е конфигуриран за Netlify чрез `netlify.toml`:

- Build command: `npm run build`
- Publish directory: `dist`

Импортирай репото в Netlify (New site from Git) и настройките ще се приложат автоматично.

## Поръчки

Формата за checkout изпраща данните през [FormSubmit](https://formsubmit.co/) към имейла на разсадника. При първа поръчка FormSubmit ще изпрати имейл за потвърждение на адреса, който трябва да бъде одобрен еднократно.
