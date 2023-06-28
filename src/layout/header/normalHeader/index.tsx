import {Button} from "@/component";
import {SlBasket} from "react-icons/sl";
import {FcMultipleSmartphones} from "react-icons/fc";
import {useNavigate} from "react-router";
import {useCookies} from "react-cookie";
import ApiClient from "@/services/api-client";
import {ResultMessage} from "@/interfaces";
import {useSelector} from "react-redux";


const NormalHeader = () => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["token"]);
  const cartArrayLength = useSelector(state => state.cartArray.products.length);


  const handleManageButton = () => {
    async function verifyToken() {
      if (cookies.token) {
        try {
          const instance = new ApiClient("/api/login/verify-token");
          const result = await instance.verifyToken(cookies.token) as Promise<ResultMessage>;
          console.log(result);
          navigate("/main-manager-page");
        } catch (error) {
          navigate("/login");
        }
      } else {
        navigate("/login");
      }
    }

    verifyToken();
  };


  return (
    <div className={"flex justify-between bg-[#8130d1] p-2"}>
      <div className={"flex items-center gap-2"}>
        <FcMultipleSmartphones className={"text-2xl"}/>
        <p className={"text-xs text-white"}>موبایل ناصر</p>
      </div>
      <div className={"flex gap-4 text-xs"}>
        <Button onClick={handleManageButton} variant={"managerButton"}>مدیریت</Button>
        <Button variant={"managerButton"}>
          <div className={"flex gap-2 items-center"}>
            <SlBasket/>
            <p>سبد خرید</p>
            <div className={"relative"}>
              <div className={"absolute bg-red-500 p-1 rounded-3xl"}>{cartArrayLength}</div>
            </div>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default NormalHeader;