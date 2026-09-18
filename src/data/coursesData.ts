import { MasterclassCourse } from '../types';
import { SCRIPT_SCENES } from './scriptData';
import { BIOMOLECULES_SCRIPT_SCENES } from './biomoleculesScriptData';

export const MASTERCLASS_COURSES: MasterclassCourse[] = [
  {
    id: 'gases-fisiologia',
    title: 'Físico-Química de los Gases Ideales y Fisiología Respiratoria Humana',
    shortTitle: 'Gases Ideales & Fisiología',
    badge: 'Cátedra 1',
    category: 'Fisioquímica y Respiratorio',
    academicLevel: 'Nivel Universitario / Medicina Humana',
    presenter: 'Prof. Aquila (Mascota Universitaria)',
    presenterDesc: 'Águila antropomórfica con bata médica blanca, sudadera roja universitaria, gafas de protección y puntero láser.',
    scenery: 'Aula Magna y Laboratorio de Fisiología Pulmonar',
    totalDurationFormatted: '24:00 min',
    scenes: SCRIPT_SCENES,
  },
  {
    id: 'biomoleculas-membranas',
    title: 'Química Orgánica, Estructura de Biomoléculas y Membranas Biológicas',
    shortTitle: 'Biomoléculas & Membranas',
    badge: 'Cátedra 2 (Nuevo)',
    category: 'Bioquímica y Biología Celular',
    academicLevel: 'Primer Ciclo de Medicina y Ciencias de la Salud',
    presenter: 'Aquila (Mascota Universitaria)',
    presenterDesc: 'Águila antropomórfica con bata médica, gafas de protección al cuello y puntero analítico.',
    scenery: 'Laboratorio de Bioquímica y Biología Celular con pizarra sintética interactiva y proyectores moleculares 3D',
    totalDurationFormatted: '24:00 min',
    scenes: BIOMOLECULES_SCRIPT_SCENES,
  },
];
