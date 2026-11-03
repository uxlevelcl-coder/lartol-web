// Conexión con Sanity (CMS de proyectos)
// Proyecto: 2gmzeay7 · Dataset: lartol · lectura publica, escritura con token

import type { Proyecto } from '../data/proyectos';

const PROJECT_ID = '2gmzeay7';
const DATASET = 'lartol';
const API = `https://${PROJECT_ID}.api.sanity.io/v2021-06-07/data/query/${DATASET}`;

const QUERY = `*[_type == "proyecto"] | order(orden asc) {
  "id": _id,
  titulo,
  disciplina,
  ubicacion,
  anio,
  rol,
  mandante,
  desafio,
  hecho,
  resultado,
  destacado,
  "imagen": imagen.asset->url,
  "datos": datos[]{etiqueta, valor}
}`;

type DocSanity = {
  id: string;
  titulo: string;
  disciplina: string;
  ubicacion: string;
  anio: number;
  rol: string;
  mandante: string | null;
  desafio: string;
  hecho: string[] | null;
  resultado: string | null;
  destacado: boolean | null;
  imagen: string | null;
  datos: { etiqueta: string; valor: string }[] | null;
};

function normalizar(d: DocSanity): Proyecto {
  return {
    id: d.id,
    titulo: d.titulo,
    disciplina: d.disciplina,
    ubicacion: d.ubicacion,
    anio: d.anio,
    rol: d.rol,
    mandante: d.mandante ?? null,
    desafio: d.desafio,
    hecho: d.hecho ?? [],
    resultado: d.resultado ?? null,
    destacado: d.destacado ?? false,
    imagen: d.imagen ? `${d.imagen}?w=1100&q=82&auto=format` : '',
    datos: (d.datos ?? []).map((x) => [x.etiqueta, x.valor] as [string, string]),
  };
}

export async function traerProyectos(): Promise<Proyecto[]> {
  try {
    const url = `${API}?query=${encodeURIComponent(QUERY)}`;
    const res = await fetch(url, { headers: { accept: 'application/json' } });
    if (!res.ok) throw new Error(`Sanity respondio ${res.status}`);
    const { result } = (await res.json()) as { result: DocSanity[] };
    if (!Array.isArray(result) || result.length === 0) return [];
    return result.filter((d) => d.titulo && d.imagen).map(normalizar);
  } catch (e) {
    console.warn('[sanity] No se pudo leer el CMS, se usan los datos locales:', (e as Error).message);
    return [];
  }
}
