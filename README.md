# Portafolio — Andrés Cantuña

Landing page de portafolio construida con **Astro 7 + Tailwind CSS v4**, sitio 100 % estático y lista para **Netlify** (incluye Netlify Forms).

## Estructura

```
├── netlify.toml              # Build, cabeceras de seguridad y caché
├── astro.config.mjs          # site (URL para Open Graph) + plugin Tailwind
├── scripts/generate-og.mjs   # Genera og-image.png y apple-touch-icon.png
├── public/
│   ├── favicon.svg
│   ├── og-image.png          # 1200×630 para LinkedIn / redes
│   ├── apple-touch-icon.png
│   └── robots.txt
└── src/
    ├── data/profile.ts       # ← EDITA AQUÍ: textos, proyectos, experiencia, stack
    ├── layouts/Layout.astro  # <head>: SEO, Open Graph, JSON-LD, tema sin parpadeo
    ├── styles/global.css     # Tema Tailwind, tokens y componentes base
    ├── scripts/contact.ts    # Validación + envío AJAX del formulario, copiar email
    ├── components/
    │   ├── Navbar.astro      # Navbar fija, menú móvil, sección activa
    │   ├── ThemeToggle.astro # Modo claro/oscuro (persistente)
    │   ├── Hero.astro
    │   ├── Projects.astro
    │   ├── Experience.astro  # Trayectoria + Stack técnico
    │   ├── Contact.astro     # Formulario Netlify + accesos rápidos
    │   ├── Footer.astro
    │   ├── SectionHeader.astro
    │   └── Icon.astro        # Iconos SVG inline
    └── pages/
        ├── index.astro
        ├── gracias.astro     # Respaldo si JS está desactivado
        └── 404.astro
```

## Desarrollo local

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # genera dist/
npm run preview      # sirve dist/ localmente
npm run og           # regenera la imagen Open Graph tras cambiar textos
```

> El envío del formulario **solo funciona desplegado en Netlify** (o con `netlify dev`). En local verás el mensaje de error, lo cual es esperado.

## Despliegue en Netlify

1. Sube el repo a GitHub.
2. En Netlify: **Add new site → Import an existing project** → elige el repo. `netlify.toml` ya define `npm run build` y `dist`.
3. Tras el primer deploy: **Site configuration → Forms → Enable form detection** y vuelve a desplegar (Deploys → Trigger deploy).
4. En **Forms → contact → Settings & usage → Form notifications** añade una notificación por email para recibir los mensajes.
5. Actualiza `site` en `astro.config.mjs` con tu URL final (y `npm run og` si cambiaste textos) para que Open Graph use URLs absolutas correctas.
6. Verifica la vista previa en LinkedIn con el [Post Inspector](https://www.linkedin.com/post-inspector/).
