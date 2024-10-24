import { createContext, useContext, useState, useEffect } from 'react';
import { updateURL } from '../utils/urlState';
import { GradientState, ColorStop, BlendMode, Shape } from './gradientDefaults';
import { getInitialState } from './gradientState';

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
  setBackgroundColor: (color: string) => void;
  addColorStop: () => void;
  updateColorStop: (id: string, updates: Partial<Omit<ColorStop, 'id'>>) => void;
  removeColorStop: (id: string) => void;
}

const GradientContext = createContext<GradientContextType | null>(null);

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
  const setBackgroundColor = (backgroundColor: string) => setState(prev => ({ ...prev, backgroundColor }));

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
      setBackgroundColor,
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
