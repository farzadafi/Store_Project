import {ReactNode} from "react";

interface Props {
  placeHolder: string,
  icon: ReactNode,
  type: string,
  name: string
}

const Input = ({placeHolder, icon, type, name}: Props) => {
  return (
    <div>
      <div className="relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-44 flex items-center pointer-events-none">
          {
            icon
          }
        </div>
        <input type={type} name={name}
               className="focus:ring-indigo-500 pr-6 focus:border-indigo-500 block w-full pl-24 sm:text-sm border-gray-300 rounded-md"
               placeholder={placeHolder}/>
      </div>
    </div>
  );
};

export default Input;