import React, { useState, useEffect, useMemo } from 'react';
import { getHighlighter } from 'shiki';
import { generateSVG, generateCSS } from '../utils/codeGenerators';
import type { GradientState } from '../context/GradientContext';

interface CodePreviewProps {
  type: 'svg' | 'css';
  gradient: GradientState;
}

export default function CodePreview({ type, gradient }: CodePreviewProps) {
  const [highlightedCode, setHighlightedCode] = useState('');

  // Generate raw code without highlighting for immediate display
  const rawCode = useMemo(() => {
    return type === 'svg' ? generateSVG(gradient) : generateCSS(gradient);
  }, [type, gradient]);

  useEffect(() => {
    let isMounted = true;

    const highlightCode = async () => {
      try {
        const highlighter = await getHighlighter({
          themes: ['github-dark'],
          langs: ['xml', 'css'],
        });

        if (isMounted) {
          const language = type === 'svg' ? 'xml' : 'css';
          const highlighted = highlighter.codeToHtml(rawCode, { 
            lang: language,
            theme: 'github-dark'
          });
          setHighlightedCode(highlighted);
        }
      } catch (error) {
        console.error('Error highlighting code:', error);
      }
    };

    highlightCode();

    return () => {
      isMounted = false;
    };
  }, [rawCode]);

  // Show raw code while syntax highlighting is loading
  if (!highlightedCode) {
    return (
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm font-mono text-white/90">
          {rawCode}
        </pre>
      </div>
    );
  }

  return (
    <div className="p-4 overflow-x-auto">
      <div 
        className="text-sm font-mono"
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
      />
    </div>
  );
}
