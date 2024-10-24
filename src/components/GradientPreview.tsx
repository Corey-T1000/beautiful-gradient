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
    grainFrequency,
    grainOctaves,
    grainBlendMode,
    aspectRatio,
  } = useGradient();

  const gradientId = 'mainGradient';
  const noiseId = 'noise';
  const blurId = 'blur';
  const maskId = 'shapeMask';

  const getTransform = () => {
    if (type === 'linear') {
      return `rotate(${angle}, 50, 50)`;
    }
    return '';
  };

  // Sort stops by position for consistent rendering
  const sortedStops = [...colorStops].sort((a, b) => a.position - b.position);

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
              baseFrequency={grainFrequency}
              numOctaves={grainOctaves}
              stitchTiles="stitch"
              result="noise"
            />
            <feColorMatrix
              type="matrix"
              values="1 0 0 0 0  1 0 0 0 0  1 0 0 0 0  0 0 0 1 0"
              in="noise"
              result="monoNoise"
            />
            {grainBlendMode === 'color-burn' ? (
              <>
                <feColorMatrix
                  in="monoNoise"
                  type="luminanceToAlpha"
                  result="luminance"
                />
                <feComposite
                  operator="in"
                  in="luminance"
                  in2="SourceGraphic"
                  result="composite"
                />
                <feBlend
                  mode="color-burn"
                  in="SourceGraphic"
                  in2="composite"
                />
              </>
            ) : (
              <>
                <feComposite
                  operator="arithmetic"
                  k1="1"
                  k2={grain}
                  k3="0"
                  k4="0"
                  in="monoNoise"
                  in2="SourceGraphic"
                  result="grainMix"
                />
                <feBlend
                  mode={grainBlendMode}
                  in="grainMix"
                  in2="SourceGraphic"
                />
              </>
            )}
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
              {sortedStops.map((stop) => (
                <stop
                  key={stop.id}
                  offset={`${stop.position}%`}
                  stopColor={stop.color}
                  stopOpacity={stop.alpha}
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
              {sortedStops.map((stop) => (
                <stop
                  key={stop.id}
                  offset={`${stop.position}%`}
                  stopColor={stop.color}
                  stopOpacity={stop.alpha}
                />
              ))}
            </radialGradient>
          )}

          <mask id={maskId}>
            {type === 'radial' && radialShape === 'ellipse' ? (
              <ellipse
                cx="50"
                cy="50"
                rx={50 * aspectRatio}
                ry="50"
                fill="white"
              />
            ) : (
              <rect x="0" y="0" width="100" height="100" fill="white" />
            )}
          </mask>
        </defs>

        <g mask={`url(#${maskId})`}>
          <rect
            x="0"
            y="0"
            width="100"
            height="100"
            fill={`url(#${gradientId})`}
            filter={feather > 0 ? `url(#${blurId})` : undefined}
          />
          {grain > 0 && (
            <rect
              x="0"
              y="0"
              width="100"
              height="100"
              fill={`url(#${gradientId})`}
              filter={`url(#${noiseId})`}
            />
          )}
        </g>
      </svg>
    </div>
  );
}
