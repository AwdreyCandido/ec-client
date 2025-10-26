import React from "react";

interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  title: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  onClick,
  title,
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full bg-secondary text-white text-base font-semibold px-8 py-4 rounded-xl shadow-lg hover:bg-blue-700 transition duration-300 
        ${
          props.disabled
            ? "cursor-not-allowed bg-secondary-light hover:bg-secondary-light"
            : ""
        }`}
      {...props}
    >
      {title}
    </button>
  );
};

export default PrimaryButton;
