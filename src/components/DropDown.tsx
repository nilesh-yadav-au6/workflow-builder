import React, { useState } from "react";

export type Option = {
  value: string;
  label: string;
};

interface DropdownProps {
  options: Option[];
  onSelect: (option: Option) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: Option) => {
    if (option.value === "new") {
      const flowName = prompt("Please enter your name");
      if (!flowName) return;
      option.label = flowName;
    }
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <div className="relative inline-block">
      <div>
        <button
          className="bg-white px-4 py-2 border rounded shadow-sm flex items-center justify-between w-64"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{selectedOption ? selectedOption.label : "Select a Flow"}</span>
          <svg
            className={`w-5 h-5 ml-2 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className="absolute z-10 mt-2 w-64 bg-white border rounded shadow-lg">
          {options.map((option) => (
            <button
              key={option.value}
              className={`block w-full text-indigo-50 px-4 py-2 text-left hover:bg-indigo-800 bg-indigo-950 ${
                option.value === "new" ? "bg-indigo-950" : ""
              }`}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
