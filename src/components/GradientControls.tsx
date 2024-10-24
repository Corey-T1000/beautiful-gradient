import React from 'react';
import { useGradient } from '../context/GradientContext';
import { Trash2, Plus } from 'lucide-react';
import RadialControls from './RadialControls';
import EffectsControls from './EffectsControls';

export default function GradientControls() {
  const {
    type,
    setType,
    angle,
    setAngle,
    colorStops,
    addColorStop,
    updateColorStop,
    removeColorStop,
  } = useGradient();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg space-y-6">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Gradient Type
        </h2>
        <div className="flex gap-4">
          <button
            className={`px-4 py-2 rounded-md ${
              type === 'linear'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
            onClick={() => setType('linear')}
          >
            Linear
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              type === 'radial'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
            onClick={() => setType('radial')}
          >
            Radial
          </button>
        </div>
      </div>

      {type === 'linear' ? (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Angle
          </h2>
          <input
            type="range"
            min="0"
            max="360"
            value={angle}
            onChange={(e) => setAngle(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {angle}°
          </div>
        </div>
      ) : (
        <RadialControls />
      )}

      <EffectsControls />

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Color Stops
          </h2>
          <button
            onClick={addColorStop}
            className="p-2 text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        <div className="space-y-4">
          {colorStops.map((stop) => (
            <div
              key={stop.id}
              className="flex items-center gap-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
            >
              <input
                type="color"
                value={stop.color}
                onChange={(e) =>
                  updateColorStop(stop.id, { color: e.target.value })
                }
                className="w-12 h-8 rounded cursor-pointer"
              />
              <input
                type="range"
                min="0"
                max="100"
                value={stop.position}
                onChange={(e) =>
                  updateColorStop(stop.id, {
                    position: Number(e.target.value),
                  })
                }
                className="flex-1"
              />
              <div className="text-sm text-gray-600 dark:text-gray-400 w-12">
                {stop.position}%
              </div>
              {colorStops.length > 2 && (
                <button
                  onClick={() => removeColorStop(stop.id)}
                  className="p-2 text-red-500 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}