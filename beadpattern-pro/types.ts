
export interface ColorInfo {
  id: string;
  hex: string;
  name?: string;
  code?: string;
}

export interface PatternSettings {
  width: number;
  height: number;
  maintainAspectRatio: boolean;
  useDithering: boolean;
  showGrid: boolean;
  zoom: number;
}

export interface BeadCount {
  color: ColorInfo;
  count: number;
}

export enum Language {
  EN = 'en',
  RU = 'ru'
}

export interface AppState {
  image: string | null;
  processedData: ImageData | null;
  settings: PatternSettings;
  palette: ColorInfo[];
  language: Language;
}
