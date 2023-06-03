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
        <div className="absolute inset-y-0 left-0 pl-48 flex items-center pointer-events-none">
          {
            icon
          }
        </div>
        <input type={type} name={name}
               className="focus:outline-pink-600 pr-8 outline-none block bg-transparent h-10 w-full sm:text-sm border border-gray-300 rounded-md"
               placeholder={placeHolder}/>
      </div>
    </div>
  );
};

export default Input;