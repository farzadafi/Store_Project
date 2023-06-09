import {Button, FormikInput} from "@/component";
import {FaUser} from "react-icons/fa";
import {RiLockPasswordFill} from "react-icons/ri";
import {ErrorMessage, Form, Formik} from "formik";
import {useRef} from "react";
import {LoginErrors, LoginFormValue, ResultMessage} from "@/interfaces";
import {useCookies} from "react-cookie";
import ApiClient from "@/services/api-client";
import {toast} from "react-toastify";
import {useNavigate} from "react-router";

const userIcon = <FaUser/>;
const passwordIcon = <RiLockPasswordFill/>;

const initialValues: LoginFormValue = {
  username: "",
  password: ""
};

const LoginPage = () => {
  const forgotPasswordTextRef = useRef<HTMLAnchorElement | null>(null);
  const [_cookies, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  function handleForgotPasswordClick() {
    if (forgotPasswordTextRef.current !== null) {
      forgotPasswordTextRef.current.innerText = "بزن تو سر خودت :)";
    }
  }

  const showSuccessfulToastMessage = () => {
    toast.success("خداوکیل خراب کاری نکنی", {
      position: toast.POSITION.TOP_CENTER,
      className: "toast-message"
    });
  };

  const showErrorToastMessage = () => {
    toast.error("مریضی درخواست الکی میزنی سمت سرور؟", {
      position: toast.POSITION.TOP_CENTER,
      className: "toast-message"
    });
  };

  const showNetworkErrorToastMessage = () => {
    toast.error("بک اند کارتون از دست رفت", {
      position: toast.POSITION.TOP_CENTER,
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
            errors.password = "جنس مرغوب بزن";
          else if (
            /^.{0,3}$/.test(values.password)
          )
            errors.password = "جنس مرغوب بزن";
          return errors;
        }}

                onSubmit={(values, {setSubmitting}) => {
                  setTimeout(() => {
                    const instance = new ApiClient("/api/login/getToken");
                    const resultCall = instance.loginPost(values) as Promise<ResultMessage>;
                    resultCall.then((result: ResultMessage) => {
                      setCookie("token", result.message);
                      showSuccessfulToastMessage();
                      navigate("/main-manager-page");
                    }).catch((error: ResultMessage) => {
                      if (error.message === "Network Error")
                        showNetworkErrorToastMessage();
                      else
                        showErrorToastMessage();
                    });
                    setSubmitting(false);
                  }, 400);
                }}>

          {() => (
            <Form>
              <div className={"flex flex-col gap-6"}>
                <h1 className={"text-3xl text-center whitespace-nowrap"}>فرم ورود به سامانه</h1>
                <div>
                  <FormikInput variant={"login"} icon={userIcon} type={"text"} name={"username"} placeHolder={"نام کاربری"}/>
                  <ErrorMessage name="username" component="div" className={"text-red-500 text-xs"}/>
                </div>
                <div>
                  <FormikInput variant={"login"} icon={passwordIcon} type={"password"} name={"password"} placeHolder={"رمز عبور"}/>
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