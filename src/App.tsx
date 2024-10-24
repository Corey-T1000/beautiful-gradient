import React from 'react';
import { GradientProvider } from './context/GradientContext';
import GradientPreview from './components/GradientPreview';
import UnifiedTerminal from './components/UnifiedTerminal';

function GradientApp() {
  return (
    <div className="min-h-screen bg-gray-900 text-white relative">
      <GradientPreview />

      <div className="relative z-10">
        <div className="max-w-8xl mx-auto px-4 py-24 md:py-32">
          <div className="grid md:grid-cols-[400px,1fr] gap-12 items-start">
            <div className="space-y-6">
              <div className="sticky top-8">
                <h1 className="text-4xl md:text-6xl font-light tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white via-white/80 to-white/10 leading-tight">
                  Beautiful <span className="font-extrabold"> Gradients </span>
                </h1>
                <p className="text-xl font-light text-white/60 mt-6 leading-tight">
                  Create stunning, customizable gradients with advanced
                  controls. Export as SVG or CSS for your next project.
                </p>
              </div>
            </div>

            <UnifiedTerminal />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <GradientProvider>
      <GradientApp />
    </GradientProvider>
  );
}
