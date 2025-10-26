import React from "react";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";

interface InputErrorProps {
  message?: string;
}

const InputError: React.FC<InputErrorProps> = ({ message }) => {
  return message ? (
    <p className="flex items-top gap-2 mt-2 text-base text-danger">
      <HiOutlineExclamationTriangle className="flex-none animate-bounce translate-y-2  text-[1.5rem]" />
      {message}
    </p>
  ) : (
    <></>
  );
};

export default InputError;
