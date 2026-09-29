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
npm install
npm run dev      # localhost:5173
npm run build    # genera dist/
npm run preview  # preview del build
```

## 🎨 Sistema de diseño

- **Tipografía**: Inter (sans) + Instrument Serif italic (labels)
- **Paleta**: `--color-ink #0a0a0a`, `--color-paper #ffffff`, `--color-cream #f5f3ee`, `--color-accent #c2410c`
- **Display scale**: clamp() responsive (hero 148px, xl 200px, lg 150px, md 80px, sm 44px)
- **Secciones alternadas** blanco/negro con grain noise en las oscuras

## 🚢 Deploy

El proyecto es estático. Cualquiera de:

- **Vercel / Netlify**: importar repo, build command `npm run build`, output `dist/`
- **GitHub Pages**: configurar Pages → branch `gh-pages` o workflow
- **Servidor propio**: subir contenido de `dist/` a cualquier hosting estático

## 📝 Licencia

MIT — usá el código como referencia, pero el contenido personal (foto, CV, experiencia) es de Andrés Felipe Díaz.
