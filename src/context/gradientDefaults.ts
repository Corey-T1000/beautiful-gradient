export interface ColorStop {
  id: string;
  color: string;
  alpha: number;
  position: number;
}

export type BlendMode = 'overlay' | 'color-burn' | 'multiply' | 'screen' | 'soft-light';
export type Shape = 'circle' | 'ellipse';

export interface GradientState {
  type: 'linear' | 'radial';
  angle: number;
  colorStops: ColorStop[];
  centerX: number;
  centerY: number;
  radius: number;
  radialShape: Shape;
  feather: number;
  grain: number;
  grainFrequency: number;
  grainOctaves: number;
  grainBlendMode: BlendMode;
  aspectRatio: number;
  backgroundColor: string;
}

// Default values
export const DEFAULT_GRADIENT_TYPE = 'radial' as const;
export const DEFAULT_ANGLE = 90;
export const DEFAULT_CENTER_X = 32;
export const DEFAULT_CENTER_Y = 32;
export const DEFAULT_RADIUS = 66;
export const DEFAULT_SHAPE: Shape = 'ellipse';
export const DEFAULT_FEATHER = 0;
export const DEFAULT_GRAIN = 0;
export const DEFAULT_GRAIN_FREQUENCY = 0.6;
export const DEFAULT_GRAIN_OCTAVES = 4;
export const DEFAULT_GRAIN_BLEND_MODE: BlendMode = 'overlay';
export const DEFAULT_ASPECT_RATIO = 1.0;
export const DEFAULT_BACKGROUND_COLOR = '#1e1e2e';
export const DEFAULT_COLOR_STOPS: ColorStop[] = [
  { id: '1', color: '#FF0080', alpha: 1, position: 0 },
  { id: '2', color: '#7928CA', alpha: 1, position: 100 },
];
