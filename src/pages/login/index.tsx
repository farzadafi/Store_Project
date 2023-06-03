import {Button, FormikInput} from "@/component";
import {FaUser} from "react-icons/fa";
import {RiLockPasswordFill} from "react-icons/ri";
import {ErrorMessage, Form, Formik} from "formik";
import {useRef} from "react";

const userIcon = <FaUser/>;
const passwordIcon = <RiLockPasswordFill/>;

interface MyFormValues {
  username: string,
  password: string
}

interface error {
  username?: string;
  password?: string;
}

const initialValues: MyFormValues = {
  username: "",
  password: ""
};


const LoginPage = () => {
  const forgotPasswordTextRef = useRef<HTMLAnchorElement | null>(null);

  function handleForgotPasswordClick() {
    if (forgotPasswordTextRef.current !== null) {
      forgotPasswordTextRef.current.innerText = "بزن تو سر خودت :)";
    }  }

  return (
    <div className={"h-screen bg-gradiant"}>
      <div
        className="bg-gray-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-10 rounded-md">
        <Formik initialValues={initialValues} validate={values => {
          const errors: error = {};
          if (!values.username)
            errors.username = "چی میزنی؟";
          else if (/^.{0,3}$/.test(values.username))
            errors.username = "نام کاربری سالم نیست :)";

          if (!values.password)
            errors.password = "چیز خوبی نمیزنی!";
          else if (
            /^.{0,3}$/.test(values.password)
          )
            errors.password = "چیز خوبی نمیزنی!";
          return errors;
        }}

                onSubmit={(values, {setSubmitting}) => {
                  setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                  }, 400);
                }}>

          {() => (
            <Form>
              <div className={"flex flex-col gap-6"}>
                <h1 className={"text-3xl text-center whitespace-nowrap"}>فرم ورود به سامانه</h1>
                <div>
                  <FormikInput icon={userIcon} type={"text"} name={"username"} placeHolder={"نام کاربری"}/>
                  <ErrorMessage name="username" component="div" className={"text-red-500 text-xs"}/>
                </div>
                <div>
                  <FormikInput icon={passwordIcon} type={"password"} name={"password"} placeHolder={"رمز عبور"}/>
                  <ErrorMessage name="password" component="div" className={"text-red-500 text-xs"}/>
                </div>
                <a ref={forgotPasswordTextRef} onClick={handleForgotPasswordClick} className={"text-xs -mt-5"} href="#">رمز
                  خود را فراموش کرده اید؟</a>
                <Button type={"submit"} variant={"login"}>ورود</Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;