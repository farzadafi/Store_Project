import {ReactNode} from "react";

const variants: Record<string, string> = {
};

type buttonProps = {
  variant: string,
  classes?: string,
  onClick?: () => void;
  children?: ReactNode
}

const Button = ({variant, classes, onClick, children}: buttonProps) => {
  return (
    <button className={`${variants[variant]} ${classes}`} onClick={() => {
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