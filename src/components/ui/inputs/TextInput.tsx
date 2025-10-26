import React from "react";
import { FieldError } from "react-hook-form";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
  type?: string;
  label: string;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
}

const TextInput: React.FC<TextInputProps> = ({
  id,
  name,
  type = "text",
  label,
  placeholder = "",
  style,
  className,
  ...props
}) => {
  return (
    <div className={`space-y-2 text-black ${className}`}>
      <label
        htmlFor={id}
        className="block font-medium text-inherit select-none"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        style={style}
        className={`w-full px-3 py-[0.7rem] text-base rounded-xl border border-neutral-400 focus:outline-none focus:ring-2 focus:ring-green-500`}
        {...props}
      />
    </div>
  );
};

export default TextInput;
