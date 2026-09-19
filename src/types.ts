export type MascotMood =
  | 'idle'
  | 'explaining'
  | 'pointing'
  | 'thinking'
  | 'enthusiastic'
  | 'serious'
  | 'celebrating';

export type InteractiveSimulationType =
  // Bloque 1: Materia y Energía en el Organismo Humano (14-09-2026 al 16-10-2026)
  | 'pure-vs-applied-chemistry'
  | 'bioenergetics-nutrition'
  | 'chemical-bonds-electrolytes'
  | 'inorganic-functions-clinical'
  | 'water-solutions-tonicity'
  | 'ph-henderson-hasselbalch'
  | 'block1-clinical-challenge'
  // Bloque 2: Gases y su Aplicación en Medicina (19-10-2026 al 10-11-2026)
  | 'kinetic-theory'
  | 'state-variables'
  | 'gas-laws'
  | 'combined-gas-law'
  | 'ideal-gas-derivation'
  | 'gas-mixtures-diffusion'
  | 'alveolar-physiology'
  | 'gas-transport-hb'
  | 'clinical-challenge'
  // Bloque 3: Química Orgánica y Biomoléculas (24-11-2026 al 22-01-2027)
  | 'carbon-organic-origin'
  | 'carbohydrates-stereochem'
  | 'disaccharides-polysaccharides'
  | 'lipids-triglycerides'
  | 'specialized-lipids'
  | 'proteins-enzymes-kinetics'
  | 'fluid-mosaic-membrane'
  | 'biomolecules-solved-problems'
  | 'biomolecules-clinical-challenge'
  | 'biomolecules-exam-quiz';

export interface SceneSpeechSegment {
  id: string;
  speaker: string;
  text: string;
  emphasis?: string;
  actionNote?: string;
  timestampStart: number; // in seconds relative to scene
  duration: number; // seconds
}

export interface ScriptScene {
  id: number;
  title: string;
  subtitle: string;
  timeRangeFormatted: string;
  startSeconds: number;
  durationSeconds: number;
  cameraShot: string;
  actionDescription: string;
  speechSegments: SceneSpeechSegment[];
  keyFormulas: string[];
  tableData?: {
    headers: string[];
    rows: string[][];
  };
  keyPoints: string[];
  simulationType: InteractiveSimulationType;
  customVisualUrl?: string;
}

export interface MasterclassCourse {
  id: string;
  blockNumber: number;
  dates: string;
  title: string;
  shortTitle: string;
  badge: string;
  category: string;
  academicLevel: string;
  presenter: string;
  presenterDesc: string;
  scenery: string;
  totalDurationFormatted: string;
  practicalLabs?: string[];
  evaluations?: string[];
  supportDocuments?: string[];
  scenes: ScriptScene[];
}

export type AspectRatioType = '1:1' | '2:3' | '3:2' | '3:4' | '4:3' | '9:16' | '16:9' | '21:9';
export type ImageSizeType = '512px' | '1K' | '2K' | '4K';
export type ImageModelType = 'gemini-3-pro-image-preview' | 'gemini-3.1-flash-image-preview';

export interface GeneratedImageRecord {
  id: string;
  url: string;
  prompt: string;
  model: string;
  aspectRatio: string;
  imageSize: string;
  timestamp: string;
  appliedToSceneId?: number;
}
