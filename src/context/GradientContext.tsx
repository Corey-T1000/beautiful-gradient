import React, { createContext, useContext, useState, useEffect } from 'react';
import { decodeState, updateURL } from '../utils/urlState';

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

// Get initial state from URL or defaults
function getInitialState(): GradientState {
  const urlState = decodeState(window.location.search);
  return {
    type: urlState.type ?? DEFAULT_GRADIENT_TYPE,
    angle: urlState.angle ?? DEFAULT_ANGLE,
    centerX: urlState.centerX ?? DEFAULT_CENTER_X,
    centerY: urlState.centerY ?? DEFAULT_CENTER_Y,
    radius: urlState.radius ?? DEFAULT_RADIUS,
    radialShape: urlState.radialShape ?? DEFAULT_SHAPE,
    feather: urlState.feather ?? DEFAULT_FEATHER,
    grain: urlState.grain ?? DEFAULT_GRAIN,
    grainFrequency: urlState.grainFrequency ?? DEFAULT_GRAIN_FREQUENCY,
    grainOctaves: urlState.grainOctaves ?? DEFAULT_GRAIN_OCTAVES,
    grainBlendMode: urlState.grainBlendMode ?? DEFAULT_GRAIN_BLEND_MODE,
    aspectRatio: urlState.aspectRatio ?? DEFAULT_ASPECT_RATIO,
    colorStops: urlState.colorStops ?? DEFAULT_COLOR_STOPS,
  };
}

export function GradientProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<GradientState>(getInitialState);

  // Update URL when state changes
  useEffect(() => {
    updateURL(state);
  }, [state]);

  const setType = (type: 'linear' | 'radial') => setState(prev => ({ ...prev, type }));
  const setAngle = (angle: number) => setState(prev => ({ ...prev, angle }));
  const setCenterX = (centerX: number) => setState(prev => ({ ...prev, centerX }));
  const setCenterY = (centerY: number) => setState(prev => ({ ...prev, centerY }));
  const setRadius = (radius: number) => setState(prev => ({ ...prev, radius }));
  const setRadialShape = (radialShape: Shape) => setState(prev => ({ ...prev, radialShape }));
  const setFeather = (feather: number) => setState(prev => ({ ...prev, feather }));
  const setGrain = (grain: number) => setState(prev => ({ ...prev, grain }));
  const setGrainFrequency = (grainFrequency: number) => setState(prev => ({ ...prev, grainFrequency }));
  const setGrainOctaves = (grainOctaves: number) => setState(prev => ({ ...prev, grainOctaves }));
  const setGrainBlendMode = (grainBlendMode: BlendMode) => setState(prev => ({ ...prev, grainBlendMode }));
  const setAspectRatio = (aspectRatio: number) => setState(prev => ({ ...prev, aspectRatio }));

  const addColorStop = () => {
    setState(prev => {
      const newId = (Math.max(...prev.colorStops.map(s => parseInt(s.id))) + 1).toString();
      const position = Math.round((prev.colorStops[prev.colorStops.length - 1].position + prev.colorStops[0].position) / 2);
      return {
        ...prev,
        colorStops: [...prev.colorStops, { id: newId, color: '#FFFFFF', alpha: 1, position }]
      };
    });
  };

  const updateColorStop = (id: string, updates: Partial<Omit<ColorStop, 'id'>>) => {
    setState(prev => ({
      ...prev,
      colorStops: prev.colorStops.map(stop => 
        stop.id === id ? { ...stop, ...updates } : stop
      )
    }));
  };

  const removeColorStop = (id: string) => {
    setState(prev => ({
      ...prev,
      colorStops: prev.colorStops.filter(stop => stop.id !== id)
    }));
  };

  return (
    <GradientContext.Provider value={{
      ...state,
      setType,
      setAngle,
      setCenterX,
      setCenterY,
      setRadius,
      setRadialShape,
      setFeather,
      setGrain,
      setGrainFrequency,
      setGrainOctaves,
      setGrainBlendMode,
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
