import React from 'react';
import { useGradient } from '../context/GradientContext';

export default function GradientPreview() {
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

  const gradientId = 'mainGradient';
  const noiseId = 'noise';
  const blurId = 'blur';

  const getTransform = () => {
    if (type === 'linear') {
      return `rotate(${angle}, 50, 50)`;
    }
    return '';
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 100 100"
      >
        <defs>
          <filter id={blurId}>
            <feGaussianBlur stdDeviation={feather} />
          </filter>
          
          <filter id={noiseId}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.6"
              numOctaves="3"
              stitchTiles="stitch"
              result="noise"
            />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 1 0"
              in="noise"
              result="monochrome"
            />
            <feComposite
              operator="arithmetic"
              k1="0"
              k2={grain}
              k3="0"
              k4="0"
              in="monochrome"
            />
          </filter>

          {type === 'linear' ? (
            <linearGradient
              id={gradientId}
              gradientTransform={getTransform()}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              {colorStops.map((stop) => (
                <stop
                  key={stop.id}
                  offset={`${stop.position}%`}
                  stopColor={stop.color}
                />
              ))}
            </linearGradient>
          ) : (
            <radialGradient
              id={gradientId}
              cx={`${centerX}%`}
              cy={`${centerY}%`}
              r={`${radius}%`}
              fx={`${centerX}%`}
              fy={`${centerY}%`}
            >
              {colorStops.map((stop) => (
                <stop
                  key={stop.id}
                  offset={`${stop.position}%`}
                  stopColor={stop.color}
                />
              ))}
            </radialGradient>
          )}
        </defs>

        <g filter={`url(#${blurId})`}>
          {type === 'radial' && radialShape === 'ellipse' ? (
            <ellipse
              cx="50"
              cy="50"
              rx={50 * aspectRatio}
              ry="50"
              fill={`url(#${gradientId})`}
            />
          ) : (
            <rect
              x="0"
              y="0"
              width="100"
              height="100"
              fill={`url(#${gradientId})`}
            />
          )}
        </g>
        
        <rect
          x="0"
          y="0"
          width="100"
          height="100"
          filter={`url(#${noiseId})`}
          opacity={grain}
        />
      </svg>
    </div>
  );
}