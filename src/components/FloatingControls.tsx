import React, { useState, useRef, useEffect } from 'react';
import { useGradient } from '../context/GradientContext';
import { GripHorizontal, Minimize2, Maximize2, Plus, Trash2 } from 'lucide-react';
import RadialControls from './RadialControls';
import EffectsControls from './EffectsControls';

export default function FloatingControls() {
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

  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [isMinimized, setIsMinimized] = useState(false);
  const [activeTab, setActiveTab] = useState<'basic' | 'effects' | 'colors'>('basic');
  const controlRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (controlRef.current) {
      setIsDragging(true);
      setStartPos({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const newX = e.clientX - startPos.x;
      const newY = e.clientY - startPos.y;
      
      const maxX = window.innerWidth - (controlRef.current?.offsetWidth || 0);
      const maxY = window.innerHeight - (controlRef.current?.offsetHeight || 0);
      
      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY)),
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, startPos]);

  return (
    <div
      ref={controlRef}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
      className={`fixed z-50 w-80 rounded-xl shadow-2xl transition-all duration-300 ease-in-out
        ${isMinimized ? 'h-12' : 'h-auto'}
        bg-white/10 dark:bg-gray-900/80 backdrop-blur-xl
        border border-white/10 dark:border-gray-700/20`}
    >
      <div
        className="h-12 px-4 flex items-center justify-between cursor-move"
        onMouseDown={handleMouseDown}
      >
        <GripHorizontal className="w-5 h-5 text-white/60" />
        <span className="text-sm font-medium text-white/80">
          Gradient Controls
        </span>
        <button
          onClick={() => setIsMinimized(!isMinimized)}
          className="text-white/60 hover:text-white/90 transition-colors"
        >
          {isMinimized ? (
            <Maximize2 className="w-4 h-4" />
          ) : (
            <Minimize2 className="w-4 h-4" />
          )}
        </button>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isMinimized ? 'max-h-0' : 'max-h-[600px]'
        }`}
      >
        <div className="border-b border-white/10">
          <div className="flex">
            {(['basic', 'effects', 'colors'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-4 py-2 text-sm font-medium transition-colors
                  ${activeTab === tab
                    ? 'text-white/90 border-b-2 border-purple-500'
                    : 'text-white/60 hover:text-white/90'
                  }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4">
          {activeTab === 'basic' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Type</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setType('linear')}
                      className={`px-3 py-1 rounded-md text-xs transition-colors ${
                        type === 'linear'
                          ? 'bg-purple-600 text-white'
                          : 'bg-white/5 text-white/60 hover:bg-white/10'
                      }`}
                    >
                      Linear
                    </button>
                    <button
                      onClick={() => setType('radial')}
                      className={`px-3 py-1 rounded-md text-xs transition-colors ${
                        type === 'radial'
                          ? 'bg-purple-600 text-white'
                          : 'bg-white/5 text-white/60 hover:bg-white/10'
                      }`}
                    >
                      Radial
                    </button>
                  </div>
                </div>

                {type === 'linear' ? (
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Angle</span>
                      <span className="text-white/90">{angle}°</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="360"
                      value={angle}
                      onChange={(e) => setAngle(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                ) : (
                  <RadialControls />
                )}
              </div>
            </div>
          )}

          {activeTab === 'effects' && <EffectsControls />}

          {activeTab === 'colors' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-white/90">
                  Color Stops
                </span>
                <button
                  onClick={addColorStop}
                  className="p-1.5 text-white/60 hover:text-white/90 bg-white/5 rounded-md hover:bg-white/10 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3">
                {colorStops.map((stop) => (
                  <div
                    key={stop.id}
                    className="flex items-center gap-3 bg-white/5 p-3 rounded-lg"
                  >
                    <input
                      type="color"
                      value={stop.color}
                      onChange={(e) =>
                        updateColorStop(stop.id, { color: e.target.value })
                      }
                      className="w-8 h-8 rounded cursor-pointer bg-transparent"
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
                    <div className="text-sm text-white/60 w-12">
                      {stop.position}%
                    </div>
                    {colorStops.length > 2 && (
                      <button
                        onClick={() => removeColorStop(stop.id)}
                        className="p-1.5 text-red-400 hover:text-red-300 bg-white/5 rounded-md hover:bg-white/10 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}