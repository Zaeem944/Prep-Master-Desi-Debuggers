import React from 'react';

interface InputFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, placeholder, value, onChange }) => {
  return (
    <div className="w-1/3 mx-auto">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inputField">
        {label}
      </label>
      <input
        type="text"
        id="inputField"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default InputField;
