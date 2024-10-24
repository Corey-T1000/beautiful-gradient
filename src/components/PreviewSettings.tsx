import { useGradient } from '../context/GradientContext';

export default function PreviewSettings() {
  const { backgroundColor, setBackgroundColor } = useGradient();

  return (
    <div className="space-y-4">
      <div className="text-white/80 text-sm font-bold font-['Inter'] uppercase leading-tight tracking-wider mb-4">
        Preview Settings
      </div>
      
      <div className="pt-0.5 flex justify-between items-center">
        <div className="text-white/60 text-sm font-normal">
          Background Color
        </div>
        <div className="flex items-center gap-3">
          <div className="text-white/90 text-sm font-normal font-mono">
            {backgroundColor.toUpperCase()}
          </div>
          <div className="w-9 h-9 p-px rounded-md border border-white/10">
            <input
              type="color"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
              className="w-full h-full cursor-pointer bg-transparent"
            />
          </div>
        </div>
      </div>
      
      <p className="text-xs text-white/60 italic">
        Note: Background color is for preview only and won't be included in exports
      </p>
    </div>
  );
}
