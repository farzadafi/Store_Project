import {Field} from "formik";
import {ReactNode} from "react";

interface Props {
  type: string,
  name: string,
  placeHolder: string
  icon: ReactNode
}

const FormikInput = ({type, name, placeHolder, icon}: Props) => {
  return (
    <div className="relative rounded-md shadow-sm">
      <div className="absolute inset-y-0 left-0 pl-48 flex items-center pointer-events-none">
        {
          icon
        }
      </div>
      <Field type={type} name={name} placeHolder={placeHolder}
             className={"focus:outline-pink-600 pr-8 outline-none block bg-transparent h-10 w-full sm:text-sm border border-gray-300 rounded-md"}/>
    </div>
  );
};

export default FormikInput;