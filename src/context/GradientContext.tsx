import React, { createContext, useContext, useState } from 'react';

export interface ColorStop {
  id: string;
  color: string;
  position: number;
}

export interface GradientState {
  type: 'linear' | 'radial';
  angle: number;
  colorStops: ColorStop[];
  centerX: number;
  centerY: number;
  radius: number;
  radialShape: 'circle' | 'ellipse';
  feather: number;
  grain: number;
  aspectRatio: number;
}

interface GradientContextType extends GradientState {
  setType: (type: 'linear' | 'radial') => void;
  setAngle: (angle: number) => void;
  setCenterX: (x: number) => void;
  setCenterY: (y: number) => void;
  setRadius: (radius: number) => void;
  setRadialShape: (shape: 'circle' | 'ellipse') => void;
  setFeather: (amount: number) => void;
  setGrain: (amount: number) => void;
  setAspectRatio: (ratio: number) => void;
  addColorStop: () => void;
  updateColorStop: (id: string, updates: Partial<Omit<ColorStop, 'id'>>) => void;
  removeColorStop: (id: string) => void;
}

const GradientContext = createContext<GradientContextType | null>(null);

export function GradientProvider({ children }: { children: React.ReactNode }) {
  const [type, setType] = useState<'linear' | 'radial'>('linear');
  const [angle, setAngle] = useState(90);
  const [centerX, setCenterX] = useState(50);
  const [centerY, setCenterY] = useState(50);
  const [radius, setRadius] = useState(50);
  const [radialShape, setRadialShape] = useState<'circle' | 'ellipse'>('circle');
  const [feather, setFeather] = useState(0);
  const [grain, setGrain] = useState(0);
  const [aspectRatio, setAspectRatio] = useState(1);
  const [colorStops, setColorStops] = useState<ColorStop[]>([
    { id: '1', color: '#FF0080', position: 0 },
    { id: '2', color: '#7928CA', position: 100 },
  ]);

  const addColorStop = () => {
    const newId = (Math.max(...colorStops.map(s => parseInt(s.id))) + 1).toString();
    const position = Math.round((colorStops[colorStops.length - 1].position + colorStops[0].position) / 2);
    setColorStops([...colorStops, { id: newId, color: '#FFFFFF', position }]);
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
      setRadialShape,
      feather,
      setFeather,
      grain,
      setGrain,
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