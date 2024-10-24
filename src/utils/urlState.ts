import type { GradientState, ColorStop, BlendMode } from '../context/gradientDefaults';

export function encodeState(state: GradientState): string {
  const params = new URLSearchParams();
  
  // Encode basic properties
  params.set('type', state.type);
  params.set('angle', state.angle.toString());
  params.set('centerX', state.centerX.toString());
  params.set('centerY', state.centerY.toString());
  params.set('radius', state.radius.toString());
  params.set('radialShape', state.radialShape);
  params.set('feather', state.feather.toString());
  params.set('grain', state.grain.toString());
  params.set('grainFrequency', state.grainFrequency.toString());
  params.set('grainOctaves', state.grainOctaves.toString());
  params.set('grainBlendMode', state.grainBlendMode);
  params.set('aspectRatio', state.aspectRatio.toString());
  params.set('backgroundColor', state.backgroundColor);
  
  // Encode color stops
  params.set('colorStops', JSON.stringify(state.colorStops));
  
  return params.toString();
}

export function decodeState(queryString: string): Partial<GradientState> {
  const params = new URLSearchParams(queryString);
  const state: Partial<GradientState> = {};

  // Helper function to safely parse number parameters
  const getNumber = (key: string, defaultValue: number): number => {
    const value = params.get(key);
    if (value === null) return defaultValue;
    const num = parseFloat(value);
    return isNaN(num) ? defaultValue : num;
  };

  // Decode basic properties
  if (params.has('type')) {
    const type = params.get('type');
    if (type === 'linear' || type === 'radial') {
      state.type = type;
    }
  }

  state.angle = getNumber('angle', 90);
  state.centerX = getNumber('centerX', 32);
  state.centerY = getNumber('centerY', 32);
  state.radius = getNumber('radius', 66);
  state.feather = getNumber('feather', 0);
  state.grain = getNumber('grain', 0);
  state.grainFrequency = getNumber('grainFrequency', 0.6);
  state.grainOctaves = getNumber('grainOctaves', 4);
  state.aspectRatio = getNumber('aspectRatio', 1.0);
  state.backgroundColor = params.get('backgroundColor') ?? '#1e1e2e';

  // Decode shape
  const shape = params.get('radialShape');
  if (shape === 'circle' || shape === 'ellipse') {
    state.radialShape = shape;
  }

  // Decode blend mode
  const blendMode = params.get('grainBlendMode');
  if (blendMode && ['overlay', 'color-burn', 'multiply', 'screen', 'soft-light'].includes(blendMode)) {
    state.grainBlendMode = blendMode as BlendMode;
  }

  // Decode color stops
  try {
    const colorStopsStr = params.get('colorStops');
    if (colorStopsStr) {
      const colorStops = JSON.parse(colorStopsStr);
      if (Array.isArray(colorStops) && colorStops.every(isValidColorStop)) {
        state.colorStops = colorStops;
      }
    }
  } catch (e) {
    console.error('Error parsing color stops from URL:', e);
  }

  return state;
}

function isValidColorStop(stop: unknown): stop is ColorStop {
  if (!stop || typeof stop !== 'object') return false;
  const s = stop as Record<string, unknown>;
  return (
    typeof s.id === 'string' &&
    typeof s.color === 'string' &&
    typeof s.alpha === 'number' &&
    typeof s.position === 'number'
  );
}

export function updateURL(state: GradientState) {
  const newURL = `${window.location.pathname}?${encodeState(state)}`;
  window.history.replaceState({}, '', newURL);
}
