import {ReactNode} from "react";

const commonClasses = "rounded-md flex items-center p-3 text-white";

const variants: Record<string, string> = {
  managerButton: `${commonClasses} bg-[#569aff]`,
  login: `${commonClasses} bg-gradiant w-full justify-center h-8`,
  edit: `${commonClasses} flex-1 justify-center text-sm bg-[#569aff] flex gap-2`,
  remove: `${commonClasses} flex-1 justify-center text-sm bg-red-500 flex gap-2`,
  common: `${commonClasses}`
};

type buttonProps = {
  variant: string,
  classes?: string,
  onClick?: () => void;
  children?: ReactNode,
  type?: "button" | "submit" | "reset"
}

const Button = ({variant, classes, onClick, children, type}: buttonProps) => {
  return (
    <button type={type} className={`${variants[variant]} ${classes}`} onClick={() => {
      onClick && onClick();
    }
    }>
      {
        children
      }
    </button>
  );
};

export default Button;