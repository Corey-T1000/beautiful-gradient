import React, { useState } from 'react';

interface DualModeInputProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  label?: string;
  unit?: string;
  precision?: number;
}

export default function DualModeInput({
  value,
  onChange,
  min,
  max,
  step,
  label,
  unit = '',
  precision = 1,
}: DualModeInputProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value.toString());

  const handleDoubleClick = () => {
    setIsEditing(true);
    setInputValue(value.toFixed(precision));
  };

  const handleBlur = () => {
    setIsEditing(false);
    let newValue = parseFloat(inputValue);
    
    // Validate the input
    if (isNaN(newValue)) {
      newValue = value;
    } else {
      newValue = Math.min(Math.max(newValue, min), max);
      newValue = Math.round(newValue / step) * step;
    }
    
    onChange(newValue);
    setInputValue(newValue.toFixed(precision));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleBlur();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setInputValue(value.toFixed(precision));
    }
  };

  return (
    <div className="space-y-1">
      {label && (
        <label className="text-sm text-gray-600 dark:text-gray-400">
          {label}
        </label>
      )}
      <div className="flex items-center gap-2">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-1"
        />
        <div
          onDoubleClick={handleDoubleClick}
          className="text-sm text-gray-600 dark:text-gray-400 w-20 text-right cursor-pointer"
        >
          {isEditing ? (
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              className="w-16 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-1 text-right"
              autoFocus
            />
          ) : (
            `${value.toFixed(precision)}${unit}`
          )}
        </div>
      </div>
    </div>
  );
}
