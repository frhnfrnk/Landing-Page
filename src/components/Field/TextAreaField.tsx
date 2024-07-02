import React from "react";
import Link from "next/link";

interface TextAreaProps {
  label: string;
  id: string;
  value?: string;
  onChange?: (value: string) => void;
}

const TextArea: React.FC<TextAreaProps> = ({ label, id, value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (onChange) {
      onChange(newValue);
    }
  };
  return (
    <div className="flex flex-col gap-1 mb-3">
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        defaultValue={value}
        onChange={handleChange}
        className="border-[0.8px] border-gray-900 rounded p-2 resize-none h-[200px]"
      />
    </div>
  );
};

export default TextArea;
