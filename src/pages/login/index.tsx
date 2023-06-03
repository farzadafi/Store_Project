import {Button, Input} from "@/component";
import {FaUser} from "react-icons/fa";
import {RiLockPasswordFill} from "react-icons/ri";

const userIcon = <FaUser/>;
const passwordIcon = <RiLockPasswordFill/>;

const LoginPage = () => {
  return (
    <div className={"h-screen bg-gradiant"}>
      <div className="bg-gray-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-10 rounded-md">
        <div className={"flex flex-col gap-6"}>
          <h1 className={"text-3xl text-center whitespace-nowrap"}>فرم ورود به سامانه</h1>
          <Input placeHolder={"نام کاربری"} icon={userIcon} type={"text"} name={"username"}/>
          <Input placeHolder={"رمز عبور"} icon={passwordIcon} type={"password"} name={"password"}/>
          <a className={"text-xs -mt-5"} href="#">رمز خود را فراموش کرده اید؟</a>
          <Button variant={"login"}>ورود</Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;