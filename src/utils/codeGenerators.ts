import type { GradientState } from '../context/GradientContext';

export function generateSVG(gradient: GradientState): string {
  const {
    type,
    angle,
    colorStops,
    centerX,
    centerY,
    radius,
    radialShape,
    feather,
    grain,
    aspectRatio,
  } = gradient;

  const gradientId = 'mainGradient';
  const noiseId = 'noise';
  const blurId = 'blur';

  return `<svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="${blurId}">
      <feGaussianBlur stdDeviation="${feather}" />
    </filter>
    <filter id="${noiseId}">
      <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" />
      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 ${grain} 0" />
    </filter>
    ${type === 'linear' 
      ? `<linearGradient id="${gradientId}" gradientTransform="rotate(${angle}, 50, 50)">
          ${colorStops.map(stop => 
            `<stop offset="${stop.position}%" stop-color="${stop.color}" />`
          ).join('\n          ')}
        </linearGradient>`
      : `<radialGradient id="${gradientId}" cx="${centerX}%" cy="${centerY}%" r="${radius}%">
          ${colorStops.map(stop => 
            `<stop offset="${stop.position}%" stop-color="${stop.color}" />`
          ).join('\n          ')}
        </radialGradient>`}
  </defs>
  ${type === 'radial' && radialShape === 'ellipse'
    ? `<ellipse cx="50" cy="50" rx="${50 * aspectRatio}" ry="50" fill="url(#${gradientId})" filter="url(#${blurId})" />`
    : `<rect width="100" height="100" fill="url(#${gradientId})" filter="url(#${blurId})" />`}
  <rect width="100" height="100" filter="url(#${noiseId})" opacity="${grain}" />
</svg>`;
}

export function generateCSS(gradient: GradientState): string {
  const { type, angle, colorStops, centerX, centerY, radialShape } = gradient;
  const stops = colorStops.map(stop => `${stop.color} ${stop.position}%`).join(', ');
  
  if (type === 'linear') {
    return `background: linear-gradient(${angle}deg, ${stops});`;
  } else {
    return `background: radial-gradient(${radialShape} at ${centerX}% ${centerY}%, ${stops});`;
  }
}