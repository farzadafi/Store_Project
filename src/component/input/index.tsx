import React, {ReactNode} from "react";

interface Props {
  placeHolder: string,
  icon: ReactNode,
  type: string,
  name: string,
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
  classes?: string
}

const Input = ({placeHolder, icon, type, name, onChange, classes}: Props) => {
  return (
    <div>
      <div className="relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-48 flex items-center pointer-events-none max-sm:pl-32">
          {
            icon
          }
        </div>
        <input type={type} name={name} onChange={onChange}
               className={`focus:outline-pink-600 pr-8 outline-none block bg-transparent h-10 w-full sm:text-sm border border-gray-300 rounded-md ${classes}`}
               placeholder={placeHolder}/>
      </div>
    </div>
  );
};

export default Input;