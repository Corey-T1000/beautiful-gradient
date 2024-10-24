import { useGradient } from '../context/GradientContext';
import RadialControls from './RadialControls';
import EffectsControls from './EffectsControls';
import DualModeInput from './DualModeInput';
import PreviewSettings from './PreviewSettings';

export default function GradientControls() {
  const {
    type,
    setType,
    angle,
    setAngle,
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
          <DualModeInput
            value={angle}
            onChange={setAngle}
            min={0}
            max={360}
            step={1}
            unit="°"
            precision={0}
          />
        </div>
      ) : (
        <RadialControls />
      )}

      <EffectsControls />
      <PreviewSettings />
    </div>
  );
}
