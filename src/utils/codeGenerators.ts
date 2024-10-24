import type { GradientState } from '../context/GradientContext';

// Helper to convert hex color and alpha to rgba
function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

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
    grainFrequency,
    grainOctaves,
    grainBlendMode,
    aspectRatio,
  } = gradient;

  const gradientId = 'mainGradient';
  const noiseId = 'noise';
  const blurId = 'blur';
  const maskId = 'shapeMask';

  // Sort color stops to ensure consistent rendering
  const sortedStops = [...colorStops].sort((a, b) => a.position - b.position);

  // Generate a random seed for the noise
  const noiseSeed = Math.floor(Math.random() * 1000);

  return `<svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
  <defs>
    ${feather > 0 ? `<filter id="${blurId}">
      <feGaussianBlur stdDeviation="${feather}" />
    </filter>` : ''}
    ${grain > 0 ? `
    <filter id="${noiseId}">
      <feTurbulence 
        type="fractalNoise" 
        baseFrequency="${grainFrequency}"
        numOctaves="${grainOctaves}" 
        seed="${noiseSeed}"
        stitchTiles="stitch"
        result="noise" />
      ${grainBlendMode === 'color-burn' ? `
      <feColorMatrix
        type="matrix"
        values="1 0 0 0 0  1 0 0 0 0  1 0 0 0 0  0 0 0 1 0"
        in="noise"
        result="monoNoise" />
      <feColorMatrix
        in="monoNoise"
        type="luminanceToAlpha"
        result="luminance" />
      <feComposite
        operator="in"
        in="luminance"
        in2="SourceGraphic"
        result="composite" />
      <feBlend
        mode="color-burn"
        in="SourceGraphic"
        in2="composite" />` : `
      <feColorMatrix
        type="matrix"
        values="1 0 0 0 0  1 0 0 0 0  1 0 0 0 0  0 0 0 1 0"
        in="noise"
        result="monoNoise" />
      <feComposite
        operator="arithmetic"
        k1="1"
        k2="${grain}"
        k3="0"
        k4="0"
        in="monoNoise"
        in2="SourceGraphic"
        result="grainMix" />
      <feBlend
        mode="${grainBlendMode}"
        in="grainMix"
        in2="SourceGraphic" />`}
    </filter>` : ''}
    ${type === 'linear' 
      ? `<linearGradient id="${gradientId}" gradientTransform="rotate(${angle}, 50, 50)">
          ${sortedStops.map(stop => 
            `<stop offset="${stop.position}%" stop-color="${stop.color}" stop-opacity="${stop.alpha}" />`
          ).join('\n          ')}
        </linearGradient>`
      : `<radialGradient id="${gradientId}" 
          cx="${centerX}%" 
          cy="${centerY}%" 
          r="${radius}%" 
          gradientUnits="userSpaceOnUse"
          ${radialShape === 'ellipse' ? `
          gradientTransform="translate(50 50) scale(${aspectRatio} 1) translate(-50 -50)"` : ''}>
          ${sortedStops.map(stop => 
            `<stop offset="${stop.position}%" stop-color="${stop.color}" stop-opacity="${stop.alpha}" />`
          ).join('\n          ')}
        </radialGradient>`}
    <mask id="${maskId}">
      ${type === 'radial' && radialShape === 'ellipse'
        ? `<ellipse cx="50" cy="50" rx="${50 * aspectRatio}" ry="50" fill="white" />`
        : `<rect x="0" y="0" width="100" height="100" fill="white" />`}
    </mask>
  </defs>
  <g mask="url(#${maskId})">
    <rect width="100" height="100" fill="url(#${gradientId})"${feather > 0 ? ` filter="url(#${blurId})"` : ''} />
    ${grain > 0 ? `<rect width="100" height="100" fill="url(#${gradientId})" filter="url(#${noiseId})" />` : ''}
  </g>
</svg>`;
}

export function generateCSS(gradient: GradientState): string {
  const { 
    type, 
    angle, 
    colorStops, 
    centerX, 
    centerY, 
    radius, 
    radialShape,
    aspectRatio 
  } = gradient;
  
  // Sort color stops by position
  const sortedStops = [...colorStops].sort((a, b) => a.position - b.position);
  const stops = sortedStops.map(stop => `${hexToRgba(stop.color, stop.alpha)} ${stop.position}%`).join(', ');
  
  if (type === 'linear') {
    return `background: linear-gradient(${angle}deg, ${stops});`;
  } else {
    // For radial gradients, include shape, size, and position
    const shape = radialShape === 'circle' ? 'circle' : `ellipse`;
    const size = radialShape === 'circle' 
      ? `${radius}%` 
      : `${radius * aspectRatio}% ${radius}%`;
    return `background: radial-gradient(${shape} ${size} at ${centerX}% ${centerY}%, ${stops});`;
  }
}
