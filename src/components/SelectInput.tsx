import React, { FC } from "react";

interface SelectInputProps {
  name: string;
  label: string;
  value: string;
  onChange: (val: React.ChangeEvent<HTMLSelectElement>) => void;
  optionsList: Array<string> | [];
  placeHolderText: string;
}

const SelectInput: FC<SelectInputProps> = ({
  label,
  name,
  value,
  onChange,
  optionsList,
  placeHolderText,
}: SelectInputProps) => {
  return (
    <>
      <p className="text-indigo-50 mt-1 text-xs font-light">{label}</p>
      <select
        className="w-full focus:outline-none text-xs font-light"
        name={name}
        id={name}
        value={value}
        onChange={onChange}
      >
        <option>{placeHolderText}</option>
        {optionsList?.map((option) => {
          return (
            <option key={option} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default SelectInput;
