import React from "react";

interface InputFieldProps {
  label: string;
  type: string;
  id: string;
  value?: any;
  placeholder?: string;
  onChange?: (value: string) => void;
  min?: number;
  max?: number;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  id,
  value,
  onChange,
  placeholder,
  min,
  max,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };
  return (
    <div className="flex flex-col gap-1 mb-3">
      <label htmlFor={id}>{label}</label>
      <input
        onChange={handleChange}
        placeholder={placeholder}
        autoComplete="on"
        type={type}
        id={id}
        min={min}
        max={max}
        defaultValue={value}
        className="border-[0.8px] border-gray-900 rounded p-2 placeholder:text-sm"
      />
    </div>
  );
};

export default InputField;
