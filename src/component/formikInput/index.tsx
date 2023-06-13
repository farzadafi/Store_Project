import {Field} from "formik";
import {ReactNode} from "react";

interface Props {
  type: string,
  name: string,
  placeHolder: string
  icon: ReactNode,
  variant: string
}

const variants: Record<string, string> = {
  login: `absolute inset-y-0 left-0 pl-[12.5rem] flex items-center pointer-events-none`,
  addProduct: `absolute inset-y-0 left-0 pl-[22.3rem] flex items-center pointer-events-none`,
};

const FormikInput = ({type, name, placeHolder, icon, variant}: Props) => {
  return (
    <div className="relative rounded-md shadow-sm">
      <div className={`${variants[variant]}`}>
        {
          icon
        }
      </div>
      <Field type={type} name={name} placeholder={placeHolder}
             className={"focus:outline-pink-600 pr-8 outline-none block bg-transparent h-10 w-full sm:text-sm border border-gray-300 rounded-md"}/>
    </div>
  );
};

export default FormikInput;