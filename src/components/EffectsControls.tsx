import { useGradient } from '../context/GradientContext';
import { Trash2, Plus } from 'lucide-react';
import type { BlendMode } from '../context/GradientContext';

export default function EffectsControls() {
  const { 
    feather, 
    setFeather, 
    grain, 
    setGrain,
    grainFrequency,
    setGrainFrequency,
    grainOctaves,
    setGrainOctaves,
    grainBlendMode,
    setGrainBlendMode,
    colorStops,
    addColorStop,
    updateColorStop,
    removeColorStop,
  } = useGradient();

  const blendModes: BlendMode[] = ['overlay', 'color-burn', 'multiply', 'screen', 'soft-light'];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
        Effects
      </h2>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-base font-medium text-gray-900 dark:text-white">
            Color Stops
          </h3>
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

      <div className="space-y-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
        <h3 className="text-base font-medium text-gray-900 dark:text-white">
          Grain Effect
        </h3>
        
        <div>
          <label className="text-sm text-gray-600 dark:text-gray-400">
            Intensity
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

        <div>
          <label className="text-sm text-gray-600 dark:text-gray-400">
            Detail (Frequency)
          </label>
          <input
            type="range"
            min="0.1"
            max="20"
            step="0.1"
            value={grainFrequency}
            onChange={(e) => setGrainFrequency(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {grainFrequency.toFixed(1)}
          </div>
        </div>

        <div>
          <label className="text-sm text-gray-600 dark:text-gray-400">
            Complexity (Octaves)
          </label>
          <input
            type="range"
            min="1"
            max="10"
            step="1"
            value={grainOctaves}
            onChange={(e) => setGrainOctaves(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {grainOctaves}
          </div>
        </div>

        <div>
          <label className="text-sm text-gray-600 dark:text-gray-400">
            Blend Mode
          </label>
          <select
            value={grainBlendMode}
            onChange={(e) => setGrainBlendMode(e.target.value as BlendMode)}
            className="w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
          >
            {blendModes.map((mode) => (
              <option key={mode} value={mode}>
                {mode.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
