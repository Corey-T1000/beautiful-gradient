import { GradientState, DEFAULT_GRADIENT_TYPE, DEFAULT_ANGLE, DEFAULT_CENTER_X, DEFAULT_CENTER_Y, DEFAULT_RADIUS, DEFAULT_SHAPE, DEFAULT_FEATHER, DEFAULT_GRAIN, DEFAULT_GRAIN_FREQUENCY, DEFAULT_GRAIN_OCTAVES, DEFAULT_GRAIN_BLEND_MODE, DEFAULT_ASPECT_RATIO, DEFAULT_COLOR_STOPS, DEFAULT_BACKGROUND_COLOR } from './gradientDefaults';
import { decodeState } from '../utils/urlState';

// Get initial state from URL or defaults
export function getInitialState(): GradientState {
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
    backgroundColor: urlState.backgroundColor ?? DEFAULT_BACKGROUND_COLOR,
  };
}
