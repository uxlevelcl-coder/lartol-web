// ------------------------------------------------------------------
// DATOS DE LA EMPRESA — editar SOLO aquí.
// Todo el sitio (nav, hero, contacto, footer, JSON-LD) lee de este archivo.
// Los campos marcados PENDIENTE son marcadores: reemplazar antes de publicar.
// ------------------------------------------------------------------

// prefijo de despliegue (GitHub Pages sirve en /lartol-web/)
export const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');

export const site = {
  nombre: 'LARTOL',
  nombreLargo: 'LARTOL Ingeniería, Montaje y Diseño',
  bajada: 'Ingeniería · Montaje · Diseño',
  razonSocial: 'LARTOL Ingeniería, Montaje y Diseño SpA',
  rut: 'PENDIENTE',                       // ej. 78.123.456-7
  dominio: 'https://lartol.cl',
  email: 'contacto@lartol.cl',            // PENDIENTE: confirmar buzón real
  telefono: '+56 9 0000 0000',            // PENDIENTE
  telefonoLink: '+56900000000',           // PENDIENTE
  whatsapp: '56900000000',                // PENDIENTE: solo dígitos
  ciudad: 'Santiago',
  region: 'Región Metropolitana',
  cobertura: 'Chile continental',
  anio: 2026,
};

export const waLink = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
  'Hola LARTOL, quiero cotizar un proyecto de ingeniería y montaje.'
)}`;

export const nav = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#obras', label: 'Obras' },
  { href: '#modelos', label: 'Contratación' },
  { href: '#proceso', label: 'Método' },
  { href: '#contacto', label: 'Contacto' },
];

// lista completa: se usa en el footer y en el menú móvil
export const navCompleto = [
  { href: '#alcance', label: 'Alcance' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#obras', label: 'Obras' },
  { href: '#modelos', label: 'Contratación' },
  { href: '#proceso', label: 'Método' },
  { href: '#estandares', label: 'Estándares' },
  { href: '#entrega', label: 'Entrega' },
  { href: '#sectores', label: 'Sectores' },
  { href: '#contacto', label: 'Contacto' },
];
