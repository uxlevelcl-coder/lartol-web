# LARTOL · Ingeniería, Montaje y Diseño

Sitio de una página construido en **Astro 5** (HTML estático, sin backend).

**Sistema visual:** editorial industrial — grafito cálido `#14120D`, hueso `#F4EFE5`,
ocre `#D9A036`; tipografía Archivo (display/UI) + JetBrains Mono (datos); radios en 0;
contenedor 1260 px; hero full-bleed con fotografía y nav transparente.

## Comandos

```bash
npm install       # una vez
npm run dev       # http://localhost:4321 con recarga en caliente
npm run build     # genera /dist  (esto es lo que se publica)
npm run preview   # sirve /dist en local
```

## Dónde se edita cada cosa

| Qué | Archivo |
|---|---|
| Teléfono, correo, RUT, razón social, años | `src/data/site.ts` |
| Orden del menú | `src/data/site.ts` → `nav` |
| Textos de cada sección | `src/components/<Sección>.astro` (arriba, en el bloque `---`) |
| Colores, tipografía, espaciados | `src/styles/global.css` → `:root` |
| SEO, Open Graph, JSON-LD | `src/layouts/Site.astro` |
| Imagen para compartir (1200×630) | `public/og.jpg` (fuente editable: `og-source.html`) |

**Todo el contacto vive en `src/data/site.ts`.** No hay números ni correos escritos
a mano en los componentes: se cambian una vez y se replican en header, hero, formulario y footer.

## Sanity (CMS de proyectos)

Los proyectos se editan en Sanity, no en el código.

| Dato | Valor |
|---|---|
| Proyecto | `2gmzeay7` |
| Dataset | `lartol` (lectura pública, escritura con token) |
| Studio | `studio/` |
| Consulta | `src/lib/sanity.ts` (GROQ, se ejecuta en cada build) |

**Editar proyectos:** abre el Studio y entra con la cuenta que es administradora del proyecto.

```bash
cd studio
npm run dev        # http://localhost:3333
```

**Publicar el Studio** (una sola vez, requiere login interactivo):

```bash
cd studio
npx sanity login
npx sanity deploy   # queda en https://lartol.sanity.studio
```

**Cómo llegan los datos al sitio:** en cada build, `traerProyectos()` consulta el dataset. Si
Sanity no responde, el build no falla: cae a `src/data/proyectos.ts` y luego a
`src/data/proyectos.ejemplo.ts`. El sitio nunca se queda sin la sección.

**Orden de las tarjetas:** campo `orden` (menor primero). El campo `destacado` está disponible
para resaltar una obra.

**Token:** el token de escritura vive solo en `.env` (ignorado por git). No se commitea y el
build de GitHub Actions no lo necesita porque el dataset es de lectura pública.

**Campos obligatorios por proyecto:** título, disciplina, ubicación, año, imagen, rol y
"qué había que resolver". Sin eso el documento no se publica bien.

## Escala de espaciado (regla de 8)

Todo el espaciado del sitio usa múltiplos de 8 px, con 4 px como medio paso permitido.
Los tokens están en `:root` de `src/styles/global.css`:

| Token | Valor | Uso |
|---|---|---|
| `--s-0` | 4 px | medio paso: separación mínima entre label y campo |
| `--s-1` | 8 px | gaps internos de listas y chips |
| `--s-2` | 16 px | padding de campos, separación entre textos |
| `--s-3` | 24 px | padding de tarjetas, gaps de grilla |
| `--s-4` | 32 px | separación entre bloques dentro de una sección |
| `--s-5` | 40 px | — |
| `--s-6` | 48 px | alto de botón grande |
| `--s-7` | 56 px | — |
| `--s-8` | 64 px | — |
| `--s-9` | 80 px | — |
| `--s-10` | 96 px | padding vertical de sección (mobile) |
| `--s-11` | 128 px | padding vertical de sección (desktop) |

**Regla:** al agregar o editar una sección, cualquier `padding`, `margin`, `gap` o
`min-height` nuevo debe salir de esta escala. Los únicos valores fuera de escala permitidos
son los bordes (1-2 px) y las medidas de componentes gráficos (anchos máximos, aspect ratios).

**Excepción documentada:** los objetivos táctiles usan 48 px (no 44) para caer en la escala
y seguir cumpliendo el mínimo WCAG de 44 px.

## Marca

El logo es vectorial (SVG) y vive en `public/img/`:

| Archivo | Uso |
|---|---|
| `logo-lartol.svg` | Completo, tinta oscura — fondos claros (documentos, cotizaciones, web) |
| `logo-lartol-claro.svg` | Completo, tinta hueso — footer y fondos oscuros |
| `logo-lartol-corto.svg` | Sin la bajada, tinta oscura |
| `logo-lartol-corto-claro.svg` | Sin la bajada, tinta hueso — **header y menú** |
| `isotipo-lartol.svg` | Solo la marca (L + triángulo) |
| `favicon.svg` | Isotipo sobre grafito, 440×320 |

**Colores oficiales:** tinta `#1E1E21`, naranja `#F0842C`. El sitio usa esos valores en
`--ink` y `--accent`.

**Regla de uso:** sobre fondos oscuros va la versión `-claro`; sobre fondos claros, la de tinta
oscura. Distancia mínima de resguardo: el alto de la "L" del isotipo. No deformar, no recolorear
fuera de las dos tintas, no poner sobre fotos sin velo.

## Imágenes

Las fotos de la galería y del hero están en `public/img/obras/` (webp, 1200-1376 px).
Son **imágenes de referencia de tipología**, no obras de LARTOL: la nota al pie de la
galería lo declara y debe mantenerse hasta reemplazarlas por fotos propias autorizadas.

Además hay un **isométrico técnico en SVG** generado por código
(`gen_iso.py` → `public/img/iso-galpon.svg`, 12 KB, escalable, sin licencias).

```bash
python gen_iso.py      # regenera el isométrico (largo, ancho, alto, separación entre pórticos)
```

Se usa en dos lugares: flotando en el hero y a sangre en la sección `#obra`.
Parámetros en la cabecera del script (`L`, `W`, `H`, `RISE`, `BAY`).

Para reemplazarlo por fotografía real de obra: dejar los archivos en `public/img/` y cambiar
el `<img>` de `Hero.astro` y `Obra.astro`. Formato recomendado: 1600 px de ancho, `.webp`
(calidad 82), y aplicar un velo azul para que no rompa la paleta.

## Visor 3D (`#modelo`)

El modelo del galpón se genera **por código con three.js**, no es un archivo importado:
`src/components/Visor3D.astro` construye 7 pórticos, correas, cumbrera, arriostramientos y
placas de base, y los monta en secuencia (columnas → dinteles → correas).

- **Carga diferida:** `three` (736 KB) y `OrbitControls` viven en chunks aparte y solo se piden
  cuando la sección entra al viewport. No afectan el primer render.
- **Sin rotación automática:** el modelo arranca quieto; el botón "Rotación" la activa.
- **Accesible:** respeta `prefers-reduced-motion` (aparece montado, sin animación),
  pausa el render cuando la sección no está visible o la pestaña está oculta,
  y muestra un fallback si no hay WebGL.
- **Cambiar medidas:** constantes `L`, `W`, `H`, `RISE`, `BAY` al inicio del `<script>`.

Para publicar el modelo con tus propias medidas basta editar esas constantes; no requiere
modelos glTF ni assets externos.

## Pendientes antes de publicar

1. **Registrar el dominio.** `lartol.cl` no existe en NIC Chile (verificado 02-11-2026).
   Alternativas a revisar: `lartolingenieria.cl`, `lartol.com`.
2. **Reemplazar en `src/data/site.ts`:** `telefono`, `telefonoLink`, `whatsapp`, `email`, `rut`.
   Los valores actuales son marcadores (`+56 9 0000 0000`, `PENDIENTE`).
3. **Levantar el buzón** `contacto@lartol.cl` antes de publicar el formulario.
4. **Logo definitivo.** Hoy la marca es un wordmark tipográfico + el bloque "LT" en naranja.
5. **Fotos de obra.** Si se suman, reemplazan el plano vectorial del hero.

## Formulario

No usa backend: arma un `mailto:` con los datos y abre el cliente de correo del visitante,
con un segundo botón que envía el mismo resumen por WhatsApp.

- Si se publica en **Netlify**: agregar `data-netlify="true"` y `name="cotizacion"` al `<form>`
  y quitar el `preventDefault`, para recibir los envíos en el panel.
- Si se publica en **Cloudflare Pages**: dejar como está, o conectar un endpoint propio.

## Publicación

```bash
npm run build
# Netlify: arrastrar la carpeta dist/  |  Cloudflare Pages: build "npm run build", output "dist"
```

## Verificado

- `npm run build` sin errores ni warnings.
- Playwright 1440 / 1024 / 390 px: sin scroll horizontal, un solo `h1`, 0 placeholders, 0 anclas muertas.
- Tabs de servicios y validación del formulario funcionando.
