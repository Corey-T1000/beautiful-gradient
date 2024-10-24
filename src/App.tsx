import { GradientProvider } from './context/GradientContext';
import GradientPreview from './components/GradientPreview';
import UnifiedTerminal from './components/UnifiedTerminal';

function GradientApp() {
  return (
    <div className="min-h-screen bg-gray-900 text-white relative">
      <GradientPreview />

      <div className="relative z-10">
        <div className="max-w-8xl mx-auto pl-12 pr-4 py-24 md:py-32">
          <div className="grid md:grid-cols-[400px,1fr] gap-8 items-start">
            <div className="space-y-6">
              <div className="sticky top-6">
                <h1 className="mt-20  text-4xl md:text-7xl font-light tracking-tight bg-clip-text text-transparent  bg-gradient-to-br from-white via-white/80 to-white/10 leading-tighter">
                  Beautiful <span className="font-extrabold"> Gradients </span>
                </h1>
                <p className="text-xl font-light text-white/60 mt-1 leading-tight">
                  Create stunning, customizable gradients with advanced
                  controls. Export as SVG or CSS for your next project.
                </p>
                <a
                  href="https://github.com/Corey-T1000/beautiful-gradient"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors duration-200"
                >
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    <span>View on GitHub</span>
                  </div>
                </a>
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
