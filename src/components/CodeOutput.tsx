import React, { useState } from 'react';
import { useGradient } from '../context/GradientContext';
import { Copy, Check, Download } from 'lucide-react';

export default function CodeOutput() {
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
  } = useGradient();
  const [copied, setCopied] = useState<string | null>(null);

  const generateSVG = () => {
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
  };

  const generateCSS = () => {
    const stops = colorStops.map(stop => `${stop.color} ${stop.position}%`).join(', ');
    
    if (type === 'linear') {
      return `background: linear-gradient(${angle}deg, ${stops});`;
    } else {
      return `background: radial-gradient(${radialShape} at ${centerX}% ${centerY}%, ${stops});`;
    }
  };

  const copyToClipboard = async (text: string, type: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const downloadSVG = () => {
    const blob = new Blob([generateSVG()], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'gradient.svg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-white/90">SVG Code</h2>
          <div className="flex gap-2">
            <button
              onClick={downloadSVG}
              className="p-2 text-white/60 hover:text-white/90 transition-colors"
            >
              <Download className="w-5 h-5" />
            </button>
            <button
              onClick={() => copyToClipboard(generateSVG(), 'svg')}
              className="p-2 text-white/60 hover:text-white/90 transition-colors"
            >
              {copied === 'svg' ? (
                <Check className="w-5 h-5 text-green-500" />
              ) : (
                <Copy className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
        <pre className="bg-black/20 p-4 rounded-lg overflow-x-auto text-sm">
          <code className="text-white/80">{generateSVG()}</code>
        </pre>
      </div>

      <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-white/90">CSS Code</h2>
          <button
            onClick={() => copyToClipboard(generateCSS(), 'css')}
            className="p-2 text-white/60 hover:text-white/90 transition-colors"
          >
            {copied === 'css' ? (
              <Check className="w-5 h-5 text-green-500" />
            ) : (
              <Copy className="w-5 h-5" />
            )}
          </button>
        </div>
        <pre className="bg-black/20 p-4 rounded-lg overflow-x-auto text-sm">
          <code className="text-white/80">{generateCSS()}</code>
        </pre>
      </div>
    </div>
  );
}