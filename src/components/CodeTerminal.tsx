import React, { useState } from 'react';
import { Copy, Check, Download, Terminal, Code2 } from 'lucide-react';
import CodePreview from './CodePreview';
import { useGradient } from '../context/GradientContext';
import { generateSVG, generateCSS } from '../utils/codeGenerators';

type CodeType = 'svg' | 'css';

export default function CodeTerminal() {
  const [activeTab, setActiveTab] = useState<CodeType>('svg');
  const [copied, setCopied] = useState(false);
  const gradient = useGradient();

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
    <div className="bg-gray-900/80 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden transition-all duration-300 ease-in-out shadow-2xl">
      <div className="flex items-center justify-between px-4 h-12 bg-white/5">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="flex">
          <button
            onClick={() => setActiveTab('svg')}
            className={`px-3 py-1 rounded-md text-sm transition-colors ${
              activeTab === 'svg'
                ? 'text-white bg-white/10'
                : 'text-white/60 hover:text-white/90'
            }`}
          >
            <Code2 className="w-4 h-4 inline-block mr-1" />
            SVG
          </button>
          <button
            onClick={() => setActiveTab('css')}
            className={`px-3 py-1 rounded-md text-sm transition-colors ${
              activeTab === 'css'
                ? 'text-white bg-white/10'
                : 'text-white/60 hover:text-white/90'
            }`}
          >
            <Terminal className="w-4 h-4 inline-block mr-1" />
            CSS
          </button>
        </div>
        <div className="flex gap-2">
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
        </div>
      </div>
      <CodePreview type={activeTab} gradient={gradient} />
    </div>
  );
}