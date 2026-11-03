import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes';

export default defineConfig({
  name: 'lartol',
  title: 'LARTOL · Proyectos',
  projectId: '2gmzeay7',
  dataset: 'lartol',
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});
