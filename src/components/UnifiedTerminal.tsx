import React, { useState } from 'react';
import { useGradient } from '../context/GradientContext';
import { Code2, Settings, Palette, Terminal, Copy, Check, Download } from 'lucide-react';
import { generateSVG, generateCSS } from '../utils/codeGenerators';
import CodePreview from './CodePreview';

type Tab = 'controls' | 'svg' | 'css';

export default function UnifiedTerminal() {
  const [activeTab, setActiveTab] = useState<Tab>('controls');
  const [copied, setCopied] = useState(false);
  const gradient = useGradient();
  const {
    type,
    setType,
    angle,
    setAngle,
    colorStops,
    addColorStop,
    updateColorStop,
    removeColorStop,
    centerX,
    setCenterX,
    centerY,
    setCenterY,
    radius,
    setRadius,
    radialShape,
    setRadialShape,
    feather,
    setFeather,
    grain,
    setGrain,
    aspectRatio,
    setAspectRatio,
  } = useGradient();

  const copyToClipboard = async () => {
    const code = activeTab === 'svg' ? generateSVG(gradient) : generateCSS(gradient);
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadSVG = () => {
    const blob = new Blob([generateSVG(gradient)], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'gradient.svg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-gray-900/80 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden shadow-2xl transition-all duration-300 ease-in-out">
      <div className="flex items-center justify-between px-4 h-12 bg-white/5">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('controls')}
            className={`px-3 py-1 rounded-md text-sm transition-colors flex items-center gap-1
              ${activeTab === 'controls' ? 'text-white bg-white/10' : 'text-white/60 hover:text-white/90'}`}
          >
            <Settings className="w-4 h-4" />
            Controls
          </button>
          <button
            onClick={() => setActiveTab('svg')}
            className={`px-3 py-1 rounded-md text-sm transition-colors flex items-center gap-1
              ${activeTab === 'svg' ? 'text-white bg-white/10' : 'text-white/60 hover:text-white/90'}`}
          >
            <Code2 className="w-4 h-4" />
            SVG
          </button>
          <button
            onClick={() => setActiveTab('css')}
            className={`px-3 py-1 rounded-md text-sm transition-colors flex items-center gap-1
              ${activeTab === 'css' ? 'text-white bg-white/10' : 'text-white/60 hover:text-white/90'}`}
          >
            <Terminal className="w-4 h-4" />
            CSS
          </button>
        </div>
        <div className="flex gap-2">
          {activeTab !== 'controls' && (
            <>
              {activeTab === 'svg' && (
                <button
                  onClick={downloadSVG}
                  className="p-2 text-white/60 hover:text-white/90 transition-colors"
                >
                  <Download className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={copyToClipboard}
                className="p-2 text-white/60 hover:text-white/90 transition-colors"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </>
          )}
        </div>
      </div>

      <div className="border-t border-white/5">
        {activeTab === 'controls' ? (
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-white/80">Type & Angle</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setType('linear')}
                    className={`flex-1 px-3 py-2 rounded-md text-sm transition-colors ${
                      type === 'linear'
                        ? 'bg-purple-600 text-white'
                        : 'bg-white/5 text-white/60 hover:bg-white/10'
                    }`}
                  >
                    Linear
                  </button>
                  <button
                    onClick={() => setType('radial')}
                    className={`flex-1 px-3 py-2 rounded-md text-sm transition-colors ${
                      type === 'radial'
                        ? 'bg-purple-600 text-white'
                        : 'bg-white/5 text-white/60 hover:bg-white/10'
                    }`}
                  >
                    Radial
                  </button>
                </div>

                {type === 'linear' ? (
                  <div className="space-y-2">
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
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setRadialShape('circle')}
                        className={`flex-1 px-3 py-2 rounded-md text-sm transition-colors ${
                          radialShape === 'circle'
                            ? 'bg-purple-600 text-white'
                            : 'bg-white/5 text-white/60 hover:bg-white/10'
                        }`}
                      >
                        Circle
                      </button>
                      <button
                        onClick={() => setRadialShape('ellipse')}
                        className={`flex-1 px-3 py-2 rounded-md text-sm transition-colors ${
                          radialShape === 'ellipse'
                            ? 'bg-purple-600 text-white'
                            : 'bg-white/5 text-white/60 hover:bg-white/10'
                        }`}
                      >
                        Ellipse
                      </button>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/60">Center X</span>
                        <span className="text-white/90">{centerX}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={centerX}
                        onChange={(e) => setCenterX(Number(e.target.value))}
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/60">Center Y</span>
                        <span className="text-white/90">{centerY}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={centerY}
                        onChange={(e) => setCenterY(Number(e.target.value))}
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/60">Radius</span>
                        <span className="text-white/90">{radius}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={radius}
                        onChange={(e) => setRadius(Number(e.target.value))}
                        className="w-full"
                      />
                    </div>

                    {radialShape === 'ellipse' && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-white/60">Aspect Ratio</span>
                          <span className="text-white/90">{aspectRatio.toFixed(2)}</span>
                        </div>
                        <input
                          type="range"
                          min="0.5"
                          max="2"
                          step="0.01"
                          value={aspectRatio}
                          onChange={(e) => setAspectRatio(Number(e.target.value))}
                          className="w-full"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium text-white/80">Effects</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Edge Feathering</span>
                      <span className="text-white/90">{feather.toFixed(1)}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      step="0.1"
                      value={feather}
                      onChange={(e) => setFeather(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Grain</span>
                      <span className="text-white/90">{(grain * 100).toFixed(0)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="0.5"
                      step="0.01"
                      value={grain}
                      onChange={(e) => setGrain(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium text-white/80">Color Stops</h3>
                <button
                  onClick={addColorStop}
                  className="p-1.5 text-white/60 hover:text-white/90 bg-white/5 rounded-md hover:bg-white/10 transition-colors"
                >
                  <Palette className="w-4 h-4" />
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
                      onChange={(e) => updateColorStop(stop.id, { color: e.target.value })}
                      className="w-8 h-8 rounded cursor-pointer bg-transparent"
                    />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={stop.position}
                      onChange={(e) => updateColorStop(stop.id, { position: Number(e.target.value) })}
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
                        <Terminal className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <CodePreview type={activeTab} gradient={gradient} />
        )}
      </div>
    </div>
  );
}