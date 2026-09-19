import { MasterclassCourse } from '../types';
import { BLOCK1_MATERIA_ENERGIA_SCENES } from './block1MateriaEnergiaData';
import { SCRIPT_SCENES } from './scriptData';
import { BIOMOLECULES_SCRIPT_SCENES } from './biomoleculesScriptData';

export const MASTERCLASS_COURSES: MasterclassCourse[] = [
  {
    id: 'bloque-1-materia-energia',
    blockNumber: 1,
    dates: '14-09-2026 al 16-10-2026',
    title: 'Bloque 1: Materia y Energía Aplicada en el Organismo Humano',
    shortTitle: 'Bloque 1: Materia & Energía',
    badge: 'Bloque 1 (14-09 al 16-10)',
    category: 'Materia, Soluciones y Equilibrio Ácido-Base',
    academicLevel: 'Primer Ciclo de Medicina y Ciencias de la Salud • Código MBAS04',
    presenter: 'Profesor Aguilar (Mascota Universitaria)',
    presenterDesc:
      'Águila antropomórfica con bata médica blanca, estetoscopio, gafas de protección y puntero láser analítico.',
    scenery:
      'Laboratorio Clínico, Gabinete de Fisiología y Monitor de Gasometría UCI de la Universidad Católica de Cuenca',
    totalDurationFormatted: '24:00 min',
    practicalLabs: [
      'Práctica 1: Normas de seguridad y equipos de laboratorio (3 pts)',
      'Práctica 2: Unidades de medida e IMC (3 pts)',
      'Práctica 3: Tipos de reacciones químicas (3 pts)',
      'Práctica 4: Factores que afectan la velocidad de reacción (3 pts)',
      'Práctica 5: Determinación de pH en alimentos (2 pts)',
    ],
    evaluations: [
      'Proyectos de aula de resolución de ejercicios (6 pts)',
      'Resumen de Webinario Internacional (2 pts)',
      'Prueba objetiva Bloque 1 (5 pts)',
    ],
    supportDocuments: [
      'Química Aplicada a la Medicina - Universidad Católica de Cuenca.pdf',
      'El Agua_ Estructura, Propiedades y Soluciones - UCACUE.pdf',
    ],
    scenes: BLOCK1_MATERIA_ENERGIA_SCENES,
  },
  {
    id: 'bloque-2-gases-medicina',
    blockNumber: 2,
    dates: '19-10-2026 al 10-11-2026',
    title: 'Bloque 2: Gases y su Aplicación en Medicina',
    shortTitle: 'Bloque 2: Gases & Medicina',
    badge: 'Bloque 2 (19-10 al 10-11)',
    category: 'Físico-Química de Gases y Fisiología Respiratoria',
    academicLevel: 'Primer Ciclo de Medicina y Ciencias de la Salud • Código MBAS04',
    presenter: 'Profesor Aguilar (Mascota Universitaria)',
    presenterDesc:
      'Águila antropomórfica con bata médica blanca, sudadera roja universitaria, gafas de protección y puntero láser.',
    scenery: 'Aula Magna y Laboratorio de Fisiología Pulmonar UCACUE',
    totalDurationFormatted: '24:00 min',
    practicalLabs: [
      'Práctica 6: Los gases y las soluciones ácido-básicas (2 pts)',
    ],
    evaluations: [
      'Proyectos de aula de aplicación de gases (7 pts)',
      'Prueba objetiva Bloque 2 (5 pts)',
      'Examen Interciclo (10 pts)',
    ],
    supportDocuments: [
      'QUÍMICA LEYES DE LOS GASES SEPTIEMBRE 2026 - FEBRERO 2027.pdf',
    ],
    scenes: SCRIPT_SCENES,
  },
  {
    id: 'bloque-3-organica-biomoleculas',
    blockNumber: 3,
    dates: '24-11-2026 al 22-01-2027',
    title: 'Bloque 3: Química Orgánica y Biomoléculas',
    shortTitle: 'Bloque 3: Orgánica & Biomoléculas',
    badge: 'Bloque 3 (24-11 al 22-01)',
    category: 'Bioquímica Estructural y Biología Celular',
    academicLevel: 'Primer Ciclo de Medicina y Ciencias de la Salud • Código MBAS04',
    presenter: 'Profesor Aguilar (Mascota Universitaria)',
    presenterDesc:
      'Águila antropomórfica con bata médica, gafas de protección al cuello y puntero analítico molecular.',
    scenery:
      'Laboratorio de Bioquímica y Biología Celular con proyectores moleculares 3D',
    totalDurationFormatted: '24:00 min',
    practicalLabs: [
      'Práctica 7: Medicina ancestral del Ecuador - Costa/Sierra (2 pts)',
      'Práctica 8: Medicina ancestral del Ecuador - Amazonía/Insular (2 pts)',
    ],
    evaluations: [
      'Investigación bibliográfica médica (10 pts)',
      'Proyecto de caso clínico aplicado (5 pts)',
      'Prueba objetiva Bloque 3 (5 pts)',
      'Evaluación Final Acumulativa (20 pts)',
    ],
    supportDocuments: [
      'QUÍMICA ORGÁNICA Y BIOMOLÉCULAS SEPTIEMBRE 2026 - FEBRERO 2027.pdf',
    ],
    scenes: BIOMOLECULES_SCRIPT_SCENES,
  },
];
