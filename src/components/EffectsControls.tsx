import React from 'react';
import { useGradient } from '../context/GradientContext';

export default function EffectsControls() {
  const { feather, setFeather, grain, setGrain } = useGradient();

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
        Effects
      </h2>

      <div>
        <label className="text-sm text-gray-600 dark:text-gray-400">
          Edge Feathering
        </label>
        <input
          type="range"
          min="0"
          max="10"
          step="0.1"
          value={feather}
          onChange={(e) => setFeather(Number(e.target.value))}
          className="w-full"
        />
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {feather.toFixed(1)}px
        </div>
      </div>

      <div>
        <label className="text-sm text-gray-600 dark:text-gray-400">
          Grain Intensity
        </label>
        <input
          type="range"
          min="0"
          max="0.5"
          step="0.01"
          value={grain}
          onChange={(e) => setGrain(Number(e.target.value))}
          className="w-full"
        />
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {(grain * 100).toFixed(0)}%
        </div>
      </div>
    </div>
  );
}