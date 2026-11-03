// ------------------------------------------------------------------
// PROYECTOS / OBRAS
// Cada ficha es una obra real. Si el array esta vacio, la seccion no se muestra.
//
// Como agregar una obra: copia el bloque de abajo y completa los campos.
// - desafio: que problema habia que resolver (la restriccion de la obra).
// - hecho: las partidas que se ejecutaron, en texto corto.
// - resultado: el cierre, medible si existe el dato.
// Los campos con null no se renderizan (no queda un hueco vacio).
//
// {
//   id: 'galpon-avo2',
//   titulo: 'Galpon de guardia de maquinaria 24 x 12 m',
//   disciplina: 'Estructura metalica',
//   ubicacion: 'Rinconada, Region de Valparaiso',
//   anio: 2025,
//   imagen: '/img/obras/obra-galpon.webp',
//   rol: 'Ejecucion directa',
//   mandante: 'Nombre del mandante',
//   desafio: 'Acceso unico por camino de tierra y ventana de montaje de dos semanas.',
//   hecho: [
//     'Ingenieria de detalle y memoria de calculo',
//     'Fabricacion de 7 porticos en taller aliado',
//     'Montaje de estructura y cubierta de zincalum',
//     'Carpeta tecnica con planos as-built',
//   ],
//   resultado: 'Obra entregada en 12 semanas sin detener el transito del acceso.',
//   datos: [['Superficie', '288 m2'], ['Tonelaje', '18 t'], ['Plazo', '12 semanas']],
//   destacado: true,
// }
// ------------------------------------------------------------------

export type Proyecto = {
  id: string;
  titulo: string;
  disciplina: string;
  ubicacion: string;
  anio: number;
  imagen: string;
  rol: string;
  mandante: string | null;
  desafio: string;
  hecho: string[];
  resultado: string | null;
  datos: [string, string][];
  destacado?: boolean;
};

// Para ver la sección con datos de muestra mientras se cargan los reales,
// cambiar a true. Nunca publicar con esto en true.
export const MOSTRAR_EJEMPLO = false;

export const proyectos: Proyecto[] = [
  // Agregar aquí las obras reales.
];
