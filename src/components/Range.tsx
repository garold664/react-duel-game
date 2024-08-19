import React, { memo } from 'react';

interface RangeProps {
  label: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const Range = memo(
  ({ label, min, max, step = 1, value, onChange }: RangeProps) => {
    return (
      <div className="flex gap-4 py-6">
        <label>{label}:</label>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={onChange}
        />
        <span className="w-10">{value}</span>
      </div>
    );
  }
);

export default Range;
