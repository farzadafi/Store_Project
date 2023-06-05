import {Button, FormikInput} from "@/component";
import {FaUser} from "react-icons/fa";
import {RiLockPasswordFill} from "react-icons/ri";
import {ErrorMessage, Form, Formik} from "formik";
import {useRef} from "react";
import {LoginErrors, LoginFormValue, ResultMessage} from "@/interfaces";
import {useCookies} from "react-cookie";
import ApiClient from "@/services/api-client";
import {toast} from "react-toastify";

const userIcon = <FaUser/>;
const passwordIcon = <RiLockPasswordFill/>;

const initialValues: LoginFormValue = {
  username: "",
  password: ""
};

const LoginPage = () => {
  const forgotPasswordTextRef = useRef<HTMLAnchorElement | null>(null);
  const [_cookies, setCookie] = useCookies(["token"]);

  function handleForgotPasswordClick() {
    if (forgotPasswordTextRef.current !== null) {
      forgotPasswordTextRef.current.innerText = "بزن تو سر خودت :)";
    }
  }

  const showSuccessfulToastMessage = () => {
    toast.success("خان اول رو تونستی رد کنی بدبخت", {
      position: toast.POSITION.TOP_RIGHT,
      className: "toast-message"
    });
  };

  const showErrorToastMessage = () => {
    toast.error("مریضی درخواست الکی میزنی سمت سرور؟", {
      position: toast.POSITION.TOP_RIGHT,
      className: "toast-message"
    });
  };

  return (
    <div className={"h-screen bg-gradiant"}>
      <div
        className="bg-gray-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-10 rounded-md">
        <Formik initialValues={initialValues} validate={values => {
          const errors: LoginErrors = {};
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
                    const instance = new ApiClient("/api/login/getToken");
                    const resultCall = instance.loginPost(values) as Promise<ResultMessage>;
                    resultCall.then((result: ResultMessage) => {
                      setCookie("token", result.message);
                      showSuccessfulToastMessage();
                    }).catch((_error: ResultMessage) => {
                        showErrorToastMessage()
                    });
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