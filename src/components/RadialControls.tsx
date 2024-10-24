import { useGradient } from '../context/GradientContext';

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
        <div>
          <label className="text-sm text-gray-600 dark:text-gray-400">
            Center X
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={centerX}
            onChange={(e) => setCenterX(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {centerX}%
          </div>
        </div>
        <div>
          <label className="text-sm text-gray-600 dark:text-gray-400">
            Center Y
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={centerY}
            onChange={(e) => setCenterY(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {centerY}%
          </div>
        </div>
      </div>

      <div>
        <label className="text-sm text-gray-600 dark:text-gray-400">
          Radius
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={radius}
          onChange={(e) => setRadius(Number(e.target.value))}
          className="w-full"
        />
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {radius}%
        </div>
      </div>

      {radialShape === 'ellipse' && (
        <div>
          <label className="text-sm text-gray-600 dark:text-gray-400">
            Aspect Ratio
          </label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={aspectRatio}
            onChange={(e) => setAspectRatio(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {aspectRatio.toFixed(1)}
          </div>
        </div>
      )}
    </div>
  );
}
