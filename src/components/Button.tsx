import { FC } from "react";

interface ButtonProps {
  title: string;
  onClick: () => void;
}

const Button: FC<ButtonProps> = ({ title, onClick }: ButtonProps) => {
  return (
    <div>
      <button
        className="bg-indigo-900 w-full text-indigo-50 hover:bg-indigo-400 rounded-md p-2"
        onClick={onClick}
      >
        {title}
      </button>
    </div>
  );
};

export default Button;
