import { useGradient } from '../context/GradientContext';
import DualModeInput from './DualModeInput';

export default function RadialControls() {
  const {
    centerX,
    centerY,
    setCenterX,
    setCenterY,
    radius,
    setRadius,
    radialShape,
    setRadialShape,
    aspectRatio,
    setAspectRatio,
  } = useGradient();

  const shapes = ['circle', 'ellipse'] as const;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
        Radial Settings
      </h2>
      
      <div className="flex gap-4 mb-4">
        {shapes.map((shape) => (
          <button
            key={shape}
            className={`px-4 py-2 rounded-md ${
              radialShape === shape
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
            onClick={() => setRadialShape(shape)}
          >
            {shape.charAt(0).toUpperCase() + shape.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <DualModeInput
          label="Center X"
          value={centerX}
          onChange={setCenterX}
          min={0}
          max={100}
          step={1}
          unit="%"
          precision={0}
        />
        <DualModeInput
          label="Center Y"
          value={centerY}
          onChange={setCenterY}
          min={0}
          max={100}
          step={1}
          unit="%"
          precision={0}
        />
      </div>

      <DualModeInput
        label="Radius"
        value={radius}
        onChange={setRadius}
        min={0}
        max={100}
        step={1}
        unit="%"
        precision={0}
      />

      {radialShape === 'ellipse' && (
        <DualModeInput
          label="Aspect Ratio"
          value={aspectRatio}
          onChange={setAspectRatio}
          min={0.5}
          max={2}
          step={0.1}
          precision={1}
        />
      )}
    </div>
  );
}
