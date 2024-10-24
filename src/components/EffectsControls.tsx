import { useGradient } from '../context/GradientContext';
import type { BlendMode } from '../context/gradientDefaults';

export default function EffectsControls() {
  const { 
    grain, 
    setGrain,
    grainFrequency,
    setGrainFrequency,
    grainOctaves,
    setGrainOctaves,
    grainBlendMode,
    setGrainBlendMode,
  } = useGradient();

  const blendModes: BlendMode[] = ['overlay', 'color-burn', 'multiply', 'screen', 'soft-light'];

  return (
    <div className="space-y-3">
      <div className="flex gap-4">
        <div className="grow h-11 p-1 rounded-full shadow-sm border border-white/20 flex justify-between items-center">
          <button
            className={`grow py-2.5 rounded-full text-center text-sm font-normal transition-all ${
              !grain
                ? 'bg-white/10 shadow-sm border border-white/20 font-bold text-white'
                : 'text-white/90 hover:text-white'
            }`}
            onClick={() => setGrain(0)}
          >
            Smooth
          </button>
          <button
            className={`grow py-2.5 rounded-full text-center text-sm font-normal transition-all ${
              grain > 0
                ? 'bg-white/10 shadow-sm border border-white/20 font-bold text-white'
                : 'text-white/90 hover:text-white'
            }`}
            onClick={() => setGrain(0.25)}
          >
            Grain
          </button>
        </div>
      </div>

      {grain > 0 && (
        <div className="space-y-3">
          <div className="pb-1.5 flex items-center gap-3">
            <div className="grow flex justify-between items-start h-5">
              <div className="text-white/60 text-sm font-normal">
                Intensity
              </div>
              <div className="text-white/90 text-sm font-normal">
                {Math.round(grain * 100)}%
              </div>
            </div>
            <div className="grow h-1.5 bg-white/10 rounded-lg relative">
              <input
                type="range"
                value={grain * 100}
                onChange={(e) => setGrain(Number(e.target.value) / 100)}
                min={0}
                max={100}
                step={1}
                className="absolute w-full h-3 opacity-0 cursor-pointer"
              />
              <div 
                className="h-3 flex items-center"
                style={{ paddingLeft: `${grain * 100}%` }}
              >
                <div className="w-3 h-3 bg-white rounded-full shadow-sm" />
              </div>
            </div>
          </div>

          <div className="pb-1.5 flex items-center gap-3">
            <div className="grow flex justify-between items-start h-5">
              <div className="text-white/60 text-sm font-normal">
                Detail
              </div>
              <div className="text-white/90 text-sm font-normal">
                {grainFrequency.toFixed(1)}
              </div>
            </div>
            <div className="grow h-1.5 bg-white/10 rounded-lg relative">
              <input
                type="range"
                value={grainFrequency}
                onChange={(e) => setGrainFrequency(Number(e.target.value))}
                min={0.1}
                max={20}
                step={0.1}
                className="absolute w-full h-3 opacity-0 cursor-pointer"
              />
              <div 
                className="h-3 flex items-center"
                style={{ paddingLeft: `${(grainFrequency / 20) * 100}%` }}
              >
                <div className="w-3 h-3 bg-white rounded-full shadow-sm" />
              </div>
            </div>
          </div>

          <div className="pb-1.5 flex items-center gap-3">
            <div className="grow flex justify-between items-start h-5">
              <div className="text-white/60 text-sm font-normal">
                Complexity
              </div>
              <div className="text-white/90 text-sm font-normal">
                {grainOctaves}
              </div>
            </div>
            <div className="grow h-1.5 bg-white/10 rounded-lg relative">
              <input
                type="range"
                value={grainOctaves}
                onChange={(e) => setGrainOctaves(Number(e.target.value))}
                min={1}
                max={10}
                step={1}
                className="absolute w-full h-3 opacity-0 cursor-pointer"
              />
              <div 
                className="h-3 flex items-center"
                style={{ paddingLeft: `${((grainOctaves - 1) / 9) * 100}%` }}
              >
                <div className="w-3 h-3 bg-white rounded-full shadow-sm" />
              </div>
            </div>
          </div>

          <div className="pt-0.5">
            <label className="text-white/60 text-sm block mb-2">Blend Mode</label>
            <select
              value={grainBlendMode}
              onChange={(e) => setGrainBlendMode(e.target.value as BlendMode)}
              className="w-full h-9 px-4 py-2 bg-white/10 rounded-md shadow-sm border border-white/10 text-white/90 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {blendModes.map((mode) => (
                <option key={mode} value={mode}>
                  {mode.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
