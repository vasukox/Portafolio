# Mi portafolio — Andrés Felipe Díaz

Portafolio web personal construido con **Vue 3 + Vite + Tailwind CSS v4**. Diseño editorial minimalista (estudio KAJO), con animaciones de scroll, contadores animados, multi-agent IA como servicio destacado y descarga de CV.

## 🚀 Stack

- **Vue 3** con Composition API (`<script setup>`)
- **Vite 8** como bundler
- **Tailwind CSS v4** (nueva arquitectura `@theme`)
- **Vue Router 4** (scroll-spy en single-page)
- Sin estado global (KISS) — todo es local o composables

## ✨ Features

- **Hero** con nombre display, rotating words animados, magnetic CTA y scroll indicator
- **Métricas reales** con slot-machine digit animation + stagger entre tarjetas
- **Proyectos** con alternancia B/N y reveal-on-scroll
- **Habilidades** con cards que se llenan del color de marca al hover (Python, Vue, React, etc.)
- **Logros** con punto 4 destacado: Agentes de IA / Multi-agent systems
- **Experiencia** y **Estudios** en timeline editorial
- **Contacto** con formulario y descarga de CV
- **Navbar** con detección de sección activa vía `IntersectionObserver` + `getBoundingClientRect`
- **Animaciones** que respetan `prefers-reduced-motion`
- **Responsive** mobile-first
- **Imágenes** en WebP + JPEG con `srcset` 1x/2x/3x

## 📂 Estructura

```
src/
├── components/         # Secciones y componentes UI
├── composables/        # useReveal, useCounter, useMagnetic
├── data/               # profile, projects, skills, logros, experience
├── router/             # Vue Router config
├── views/              # Vistas por ruta
├── App.vue
├── main.js
└── style.css           # @theme tokens + utilidades
public/
├── perfil.jpg          # Foto personal (3x variants)
├── perfil.webp
├── cv-andres-felipe-diaz.pdf
└── favicon.svg
```

## 🛠️ Desarrollo

```bash
npm ci
npm run dev      # localhost:5173
npm run build    # genera dist/
npm run preview  # preview del build
```

## 🎨 Sistema de diseño

- **Tipografía**: Inter (sans) + Instrument Serif italic (labels)
- **Paleta**: `--color-ink #0a0a0a`, `--color-paper #ffffff`, `--color-cream #f5f3ee`, `--color-accent #c2410c`
- **Display scale**: clamp() responsive (hero 148px, xl 200px, lg 150px, md 80px, sm 44px)
- **Secciones alternadas** blanco/negro con grain noise en las oscuras

## 🚢 Producción y seguridad

Usa Node 22 (`nvm use`), instala con `npm ci` y ejecuta `npm run check`.
El workflow de GitHub verifica el build y las vulnerabilidades de dependencias en cada push/PR.

- **Vercel**: importa el repositorio. `vercel.json` define build, rutas SPA, encabezados y caché.
- **Netlify**: importa el repositorio. `netlify.toml` y `public/_headers` definen el despliegue.
- **Otro servidor**: publica solamente `dist/` y adapta los mismos encabezados HTTP y rutas SPA. Los archivos de configuración de Vercel/Netlify no se aplican automáticamente en otros servidores.
- Sirve mediante HTTPS. `npm run preview` es únicamente una vista previa local; no es un servidor de producción.
- Los assets con hash en `/assets/` se almacenan durante un año; HTML y archivos públicos se revalidan. No publiques source maps.

La CSP permite scripts solo del propio sitio, bloquea objetos e iframes y limita las fuentes e imágenes a los proveedores usados. Los estilos inline son necesarios para las animaciones Vue; no se permite `unsafe-inline` en scripts ni `unsafe-eval`. No añadas dominios comodín al integrar servicios.

El contacto abre un `mailto:` con los campos codificados y validación HTML. **No existe backend de correo**: el visitante debe enviar el mensaje desde su aplicación. No se confirma una entrega inexistente. Para enviar desde la web hará falta un servicio de correo y validación, límites de frecuencia y protección contra abuso del lado del servidor.

No guardes secretos en el repositorio ni en variables `VITE_*`: todo lo incluido en el frontend es público. `.env*`, claves privadas y metadatos locales de hosting están ignorados. El CV, teléfono, correo y fotos en `public/` son públicos por diseño: revisa su contenido antes de publicar.

Después del despliegue verifica las cabeceras con `curl -I https://TU-DOMINIO/`, las rutas directas, imágenes, enlaces, descarga del CV y apertura del correo. La configuración está preparada; HTTPS, DNS y las cabeceras efectivas deben comprobarse en el hosting elegido.

## 📝 Licencia

MIT — usá el código como referencia, pero el contenido personal (foto, CV, experiencia) es de Andrés Felipe Díaz.
