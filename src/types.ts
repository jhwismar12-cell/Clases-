export type MascotMood =
  | 'idle'
  | 'explaining'
  | 'pointing'
  | 'thinking'
  | 'enthusiastic'
  | 'serious'
  | 'celebrating';

export type InteractiveSimulationType =
  // Course 1: Gases & Respiratory
  | 'kinetic-theory'
  | 'state-variables'
  | 'gas-laws'
  | 'ideal-gas-derivation'
  | 'gas-mixtures-diffusion'
  | 'alveolar-physiology'
  | 'clinical-challenge'
  // Course 2: Biomolecules & Cell Membranes
  | 'carbon-organic-origin'
  | 'carbohydrates-stereochem'
  | 'disaccharides-polysaccharides'
  | 'lipids-triglycerides'
  | 'specialized-lipids'
  | 'fluid-mosaic-membrane'
  | 'biomolecules-clinical-challenge';

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
  title: string;
  shortTitle: string;
  badge: string;
  category: string;
  academicLevel: string;
  presenter: string;
  presenterDesc: string;
  scenery: string;
  totalDurationFormatted: string;
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
