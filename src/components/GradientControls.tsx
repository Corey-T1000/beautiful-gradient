import { useGradient } from '../context/GradientContext';
import RadialControls from './RadialControls';
import EffectsControls from './EffectsControls';
import PreviewSettings from './PreviewSettings';

export default function GradientControls() {
  const {
    type,
    setType,
  } = useGradient();

  return (
    <div className="fixed top-4 right-4 w-[384px] bg-[#1a1625] rounded-lg border border-white/10 shadow-2xl text-white overflow-hidden">
      <div className="h-9 px-3 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="ml-2 text-white/80 text-sm font-medium">Controls</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-white/60 hover:text-white/80 text-sm">SVG</button>
          <button className="text-white/60 hover:text-white/80 text-sm">CSS</button>
        </div>
      </div>

      <div className="px-7 pt-5 pb-6">
        <div className="flex flex-col gap-6">
          <div>
            <div className="text-white/80 text-sm font-bold font-['Inter'] uppercase leading-tight tracking-wider mb-4">
              Type & Angle
            </div>
            
            <div className="flex gap-4">
              <div className="grow h-11 p-1 rounded-full shadow-sm border border-white/20 flex justify-between items-center">
                <button
                  className={`grow py-2.5 rounded-full text-center text-sm font-normal transition-all ${
                    type === 'linear'
                      ? 'bg-white/10 shadow-sm border border-white/20 font-bold text-white'
                      : 'text-white/90 hover:text-white'
                  }`}
                  onClick={() => setType('linear')}
                >
                  Linear
                </button>
                <button
                  className={`grow py-2.5 rounded-full text-center text-sm font-normal transition-all ${
                    type === 'radial'
                      ? 'bg-white/10 shadow-sm border border-white/20 font-bold text-white'
                      : 'text-white/90 hover:text-white'
                  }`}
                  onClick={() => setType('radial')}
                >
                  Radial
                </button>
              </div>
            </div>
          </div>

          {type === 'radial' && <RadialControls />}
          <EffectsControls />
          <PreviewSettings />
        </div>
      </div>
    </div>
  );
}
