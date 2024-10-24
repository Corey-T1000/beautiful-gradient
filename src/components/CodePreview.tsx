import React, { useState, useEffect } from 'react';
import { getHighlighter } from 'shiki';
import { generateSVG, generateCSS } from '../utils/codeGenerators';
import type { GradientState } from '../context/GradientContext';

interface CodePreviewProps {
  type: 'svg' | 'css';
  gradient: GradientState;
}

export default function CodePreview({ type, gradient }: CodePreviewProps) {
  const [highlightedCode, setHighlightedCode] = useState('');

  useEffect(() => {
    const highlightCode = async () => {
      const highlighter = await getHighlighter({
        themes: ['github-dark'],
        langs: ['xml', 'css'],
      });

      const code = type === 'svg' ? generateSVG(gradient) : generateCSS(gradient);
      const language = type === 'svg' ? 'xml' : 'css';
      const highlighted = highlighter.codeToHtml(code, { 
        lang: language,
        theme: 'github-dark'
      });
      setHighlightedCode(highlighted);
    };

    highlightCode();
  }, [type, gradient]);

  return (
    <div className="p-4 overflow-x-auto">
      <div 
        className="text-sm font-mono"
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
      />
    </div>
  );
}