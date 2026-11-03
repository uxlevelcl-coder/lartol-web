import { defineType, defineField } from 'sanity';

export const proyecto = defineType({
  name: 'proyecto',
  title: 'Proyecto',
  type: 'document',
  fields: [
    defineField({ name: 'titulo', title: 'Título de la obra', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'disciplina',
      title: 'Disciplina',
      type: 'string',
      options: {
        list: [
          'Estructura metálica',
          'Montaje mecánico',
          'Ingeniería de detalle',
          'Habilitación',
          'Obras civiles',
          'Piping',
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'ubicacion', title: 'Ubicación', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'anio', title: 'Año', type: 'number', validation: (r) => r.required() }),
    defineField({ name: 'imagen', title: 'Foto de la obra', type: 'image', options: { hotspot: true }, validation: (r) => r.required() }),
    defineField({
      name: 'rol',
      title: 'Rol de LARTOL',
      type: 'string',
      options: { list: ['Ejecución directa', 'Subcontrato', 'Por administración', 'Oficina técnica'] },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'mandante', title: 'Mandante', type: 'string', description: 'Dejar vacío si no se puede nombrar' }),
    defineField({
      name: 'desafio',
      title: 'Qué había que resolver',
      type: 'text',
      rows: 3,
      description: 'La restricción de la obra: acceso, planta en operación, plazo, tránsito.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'hecho',
      title: 'Qué se hizo',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Partidas ejecutadas, una por línea.',
    }),
    defineField({ name: 'resultado', title: 'Resultado', type: 'text', rows: 2 }),
    defineField({
      name: 'datos',
      title: 'Datos técnicos',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'dato',
          fields: [
            { name: 'etiqueta', title: 'Etiqueta', type: 'string' },
            { name: 'valor', title: 'Valor', type: 'string' },
          ],
          preview: { select: { title: 'etiqueta', subtitle: 'valor' } },
        },
      ],
    }),
    defineField({ name: 'orden', title: 'Orden', type: 'number', description: 'Menor número aparece primero' }),
    defineField({ name: 'destacado', title: 'Destacado', type: 'boolean' }),
  ],
  orderings: [{ title: 'Orden', name: 'orden', by: [{ field: 'orden', direction: 'asc' }] }],
  preview: {
    select: { title: 'titulo', subtitle: 'disciplina', media: 'imagen' },
  },
});
