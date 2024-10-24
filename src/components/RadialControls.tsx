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

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div className="grow h-11 p-1 rounded-full shadow-sm border border-white/20 flex justify-between items-center">
          <button
            className={`grow py-2.5 rounded-full text-center text-sm font-normal transition-all ${
              radialShape === 'circle'
                ? 'bg-white/10 shadow-sm border border-white/20 font-bold text-white'
                : 'text-white/90 hover:text-white'
            }`}
            onClick={() => setRadialShape('circle')}
          >
            Circle
          </button>
          <button
            className={`grow py-2.5 rounded-full text-center text-sm font-normal transition-all ${
              radialShape === 'ellipse'
                ? 'bg-white/10 shadow-sm border border-white/20 font-bold text-white'
                : 'text-white/90 hover:text-white'
            }`}
            onClick={() => setRadialShape('ellipse')}
          >
            Ellipse
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="pb-1.5 flex items-center gap-3">
          <div className="grow flex justify-between items-start h-5">
            <div className="text-white/60 text-sm font-normal">
              Center X
            </div>
            <div className="text-white/90 text-sm font-normal">
              {centerX}%
            </div>
          </div>
          <div className="grow h-1.5 bg-white/10 rounded-lg relative">
            <input
              type="range"
              value={centerX}
              onChange={(e) => setCenterX(Number(e.target.value))}
              min={0}
              max={100}
              step={1}
              className="absolute w-full h-3 opacity-0 cursor-pointer"
            />
            <div 
              className="h-3 flex items-center"
              style={{ paddingLeft: `${centerX}%` }}
            >
              <div className="w-3 h-3 bg-white rounded-full shadow-sm" />
            </div>
          </div>
        </div>

        <div className="pb-1.5 flex items-center gap-3">
          <div className="grow flex justify-between items-start h-5">
            <div className="text-white/60 text-sm font-normal">
              Center Y
            </div>
            <div className="text-white/90 text-sm font-normal">
              {centerY}%
            </div>
          </div>
          <div className="grow h-1.5 bg-white/10 rounded-lg relative">
            <input
              type="range"
              value={centerY}
              onChange={(e) => setCenterY(Number(e.target.value))}
              min={0}
              max={100}
              step={1}
              className="absolute w-full h-3 opacity-0 cursor-pointer"
            />
            <div 
              className="h-3 flex items-center"
              style={{ paddingLeft: `${centerY}%` }}
            >
              <div className="w-3 h-3 bg-white rounded-full shadow-sm" />
            </div>
          </div>
        </div>

        <div className="pb-1.5 flex items-center gap-3">
          <div className="grow flex justify-between items-start h-5">
            <div className="text-white/60 text-sm font-normal">
              Radius
            </div>
            <div className="text-white/90 text-sm font-normal">
              {radius}%
            </div>
          </div>
          <div className="grow h-1.5 bg-white/10 rounded-lg relative">
            <input
              type="range"
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              min={0}
              max={100}
              step={1}
              className="absolute w-full h-3 opacity-0 cursor-pointer"
            />
            <div 
              className="h-3 flex items-center"
              style={{ paddingLeft: `${radius}%` }}
            >
              <div className="w-3 h-3 bg-white rounded-full shadow-sm" />
            </div>
          </div>
        </div>

        {radialShape === 'ellipse' && (
          <div className="pb-1.5 flex items-center gap-3">
            <div className="grow flex justify-between items-start h-5">
              <div className="text-white/60 text-sm font-normal">
                Aspect Ratio
              </div>
              <div className="text-white/90 text-sm font-normal">
                {aspectRatio.toFixed(2)}
              </div>
            </div>
            <div className="grow h-1.5 bg-white/10 rounded-lg relative">
              <input
                type="range"
                value={aspectRatio}
                onChange={(e) => setAspectRatio(Number(e.target.value))}
                min={0.5}
                max={2}
                step={0.1}
                className="absolute w-full h-3 opacity-0 cursor-pointer"
              />
              <div 
                className="h-3 flex items-center"
                style={{ paddingLeft: `${((aspectRatio - 0.5) / 1.5) * 100}%` }}
              >
                <div className="w-3 h-3 bg-white rounded-full shadow-sm" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
