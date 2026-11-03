// Datos de EJEMPLO — solo para revisar el diseño del componente.
// No son obras reales. Activar con MOSTRAR_EJEMPLO en proyectos.ts.
import type { Proyecto } from './proyectos';

export const ejemplo: Proyecto[] = [
  {
    id: 'demo-a',
    titulo: 'Galpón de guardia de maquinaria 24 x 12 m',
    disciplina: 'Estructura metálica',
    ubicacion: 'Rinconada, Región de Valparaíso',
    anio: 2025,
    imagen: '/img/obras/obra-galpon.webp',
    rol: 'Ejecución directa',
    mandante: 'Mandante privado',
    desafio: 'Acceso único por camino de tierra y una ventana de montaje de dos semanas antes de la temporada de lluvia.',
    hecho: [
      'Ingeniería de detalle y memoria de cálculo',
      'Fabricación de 7 pórticos en taller aliado',
      'Montaje de estructura y cubierta de zincalum',
      'Carpeta técnica con planos as-built',
    ],
    resultado: 'Obra entregada en 12 semanas sin detener el tránsito del camino de acceso.',
    datos: [['Superficie', '288 m²'], ['Tonelaje', '18 t'], ['Plazo', '12 semanas']],
    destacado: true,
  },
  {
    id: 'demo-b',
    titulo: 'Racks de piping en planta en operación',
    disciplina: 'Montaje mecánico',
    ubicacion: 'Región de Antofagasta',
    anio: 2024,
    imagen: '/img/obras/obra-piping.webp',
    rol: 'Subcontrato',
    mandante: null,
    desafio: 'Montar sobre una línea en servicio, con ventanas de dos horas por turno y sin detener la producción.',
    hecho: [
      'Prefabricación de tramos fuera de la planta',
      'Perímetro apernado, sin soldadura en altura',
      'Izajes calculados para el equipo disponible en faena',
    ],
    resultado: 'Cero detenciones no programadas durante el montaje.',
    datos: [['Tramos', '34'], ['Ventana', '2 h por turno'], ['Plazo', '6 semanas']],
  },
];
