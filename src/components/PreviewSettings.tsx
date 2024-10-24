import { useGradient } from '../context/GradientContext';

export default function PreviewSettings() {
  const { backgroundColor, setBackgroundColor } = useGradient();

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
        Preview Settings
      </h2>
      <div className="flex items-center gap-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
        <label className="text-sm text-gray-600 dark:text-gray-400">
          Background Color
        </label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value)}
            className="w-12 h-8 rounded cursor-pointer"
          />
          <div className="text-sm text-gray-600 dark:text-gray-400 font-mono">
            {backgroundColor.toUpperCase()}
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 italic">
        Note: Background color is for preview only and won't be included in exports
      </p>
    </div>
  );
}
