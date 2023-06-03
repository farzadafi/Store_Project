import {ReactNode} from "react";

const commonClasses = "rounded-md flex items-center p-3 text-white";

const variants: Record<string, string> = {
  managerButton: `${commonClasses} bg-[#569aff]`,
  login: `${commonClasses} bg-gradiant w-full justify-center h-8`
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