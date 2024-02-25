import React, { useState } from "react";

type RadioProps = {
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
};

const Radio: React.FC<RadioProps> = ({ options, onChange }) => {
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedValue(value);
    onChange(value);
  };

  return (
    <div className="flex flex-col w-full w-auto">
      {options.map((option) => (
        <label
          key={option.value}
          className="text-indigo-50 w-full w-auto mb-2 bg-indigo-300 py-2 rounded"
        >
          <input
            type="radio"
            value={option.value}
            checked={selectedValue === option.value}
            onChange={handleRadioChange}
            className="radio-input"
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};

export default Radio;
