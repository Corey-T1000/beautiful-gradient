import React, { createContext, useContext, useState } from 'react';

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
}

interface GradientContextType extends GradientState {
  setType: (type: 'linear' | 'radial') => void;
  setAngle: (angle: number) => void;
  setCenterX: (x: number) => void;
  setCenterY: (y: number) => void;
  setRadius: (radius: number) => void;
  setRadialShape: (shape: Shape) => void;
  setFeather: (amount: number) => void;
  setGrain: (amount: number) => void;
  setGrainFrequency: (freq: number) => void;
  setGrainOctaves: (octaves: number) => void;
  setGrainBlendMode: (mode: BlendMode) => void;
  setAspectRatio: (ratio: number) => void;
  addColorStop: () => void;
  updateColorStop: (id: string, updates: Partial<Omit<ColorStop, 'id'>>) => void;
  removeColorStop: (id: string) => void;
}

// Default values as constants
const DEFAULT_GRADIENT_TYPE = 'radial' as const;
const DEFAULT_ANGLE = 90;
const DEFAULT_CENTER_X = 32;
const DEFAULT_CENTER_Y = 32;
const DEFAULT_RADIUS = 66;
const DEFAULT_SHAPE: Shape = 'ellipse';
const DEFAULT_FEATHER = 0;
const DEFAULT_GRAIN = 0;
const DEFAULT_GRAIN_FREQUENCY = 0.6;
const DEFAULT_GRAIN_OCTAVES = 4;
const DEFAULT_GRAIN_BLEND_MODE: BlendMode = 'overlay';
const DEFAULT_ASPECT_RATIO = 1.0;
const DEFAULT_COLOR_STOPS: ColorStop[] = [
  { id: '1', color: '#FF0080', alpha: 1, position: 0 },
  { id: '2', color: '#7928CA', alpha: 1, position: 100 },
];

const GradientContext = createContext<GradientContextType | null>(null);

export function GradientProvider({ children }: { children: React.ReactNode }) {
  const [type, setType] = useState<'linear' | 'radial'>(DEFAULT_GRADIENT_TYPE);
  const [angle, setAngle] = useState(DEFAULT_ANGLE);
  const [centerX, setCenterX] = useState(DEFAULT_CENTER_X);
  const [centerY, setCenterY] = useState(DEFAULT_CENTER_Y);
  const [radius, setRadius] = useState(DEFAULT_RADIUS);
  const [radialShape, setRadialShape] = useState<Shape>(DEFAULT_SHAPE);
  const [feather, setFeather] = useState(DEFAULT_FEATHER);
  const [grain, setGrain] = useState(DEFAULT_GRAIN);
  const [grainFrequency, setGrainFrequency] = useState(DEFAULT_GRAIN_FREQUENCY);
  const [grainOctaves, setGrainOctaves] = useState(DEFAULT_GRAIN_OCTAVES);
  const [grainBlendMode, setGrainBlendMode] = useState<BlendMode>(DEFAULT_GRAIN_BLEND_MODE);
  const [aspectRatio, setAspectRatio] = useState(DEFAULT_ASPECT_RATIO);
  const [colorStops, setColorStops] = useState<ColorStop[]>(DEFAULT_COLOR_STOPS);

  const addColorStop = () => {
    const newId = (Math.max(...colorStops.map(s => parseInt(s.id))) + 1).toString();
    const position = Math.round((colorStops[colorStops.length - 1].position + colorStops[0].position) / 2);
    setColorStops([...colorStops, { id: newId, color: '#FFFFFF', alpha: 1, position }]);
  };

  const updateColorStop = (id: string, updates: Partial<Omit<ColorStop, 'id'>>) => {
    setColorStops(colorStops.map(stop => 
      stop.id === id ? { ...stop, ...updates } : stop
    ));
  };

  const removeColorStop = (id: string) => {
    setColorStops(colorStops.filter(stop => stop.id !== id));
  };

  return (
    <GradientContext.Provider value={{
      type,
      setType,
      angle,
      setAngle,
      colorStops,
      centerX,
      setCenterX,
      centerY,
      setCenterY,
      radius,
      setRadius,
      radialShape,
      setRadialShape: (shape: Shape) => setRadialShape(shape),
      feather,
      setFeather,
      grain,
      setGrain,
      grainFrequency,
      setGrainFrequency,
      grainOctaves,
      setGrainOctaves,
      grainBlendMode,
      setGrainBlendMode: (mode: BlendMode) => setGrainBlendMode(mode),
      aspectRatio,
      setAspectRatio,
      addColorStop,
      updateColorStop,
      removeColorStop,
    }}>
      {children}
    </GradientContext.Provider>
  );
}

export function useGradient() {
  const context = useContext(GradientContext);
  if (!context) {
    throw new Error('useGradient must be used within a GradientProvider');
  }
  return context;
}
