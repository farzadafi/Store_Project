import {Button} from "@/component";
import {useLocation, useNavigate} from "react-router";
import {useCookies} from "react-cookie";
import {toast} from "react-toastify";

const ManagerHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [_cookies, _setCookie, removeCookie] = useCookies(["token"]);

  const currentRoute = location.pathname;

  const inventoryProductsHandle = () => {
    navigate("inventory");
  };

  const productsHandle = () => {
    navigate("products");
  };

  const ordersHandle = () => {
    navigate("orders");
  };

  const homeHandle = () => {
    navigate("/");
  };

  const showSuccessfulToastMessage = () => {
    toast.success("ابلفضل نگهدارت :)", {
      position: toast.POSITION.TOP_CENTER,
      className: "toast-message"
    });
  };

  const signOut = () => {
    removeCookie("token");
    showSuccessfulToastMessage();
    navigate("/");
  };

  return (
    <div className={"flex justify-between bg-[#8130d1] p-2 max-sm:gap-4 max-sm:flex-col max-sm:items-center"}>
      <div className={"flex items-center max-sm:justify-center"}>
        <p className={"text-xs text-white max-sm:text-xl max-sm:whitespace-nowrap max-sm:text-center"}>پنل مدیریت
          فروشگاه</p>
      </div>
      <div className={"flex gap-4 text-xs max-[550px]:flex-col"}>
        <div className={"flex gap-2"}>
          <Button onClick={productsHandle}
                  classes={`max-sm:whitespace-nowrap ${currentRoute === "/main-manager-page/products" ? "bg-green-500" : "bg-[#569aff]"}`}
                  variant={"managerButton"}>تمامی کالا ها</Button>
          <Button onClick={inventoryProductsHandle}
                  classes={`max-sm:whitespace-nowrap ${currentRoute === "/main-manager-page/inventory" ? "bg-green-500" : "bg-[#569aff]"}`}
                  variant={"managerButton"}>موجودی و قیمت ها</Button>
        </div>
        <div className={"flex gap-2"}>
          <Button onClick={ordersHandle}
                  classes={`max-sm:whitespace-nowrap ${currentRoute === "/main-manager-page/orders" ? "bg-green-500" : "bg-[#569aff]"}`}
                  variant={"managerButton"}>سفارش ها</Button>
          <Button onClick={homeHandle} variant={"managerButton"}>صفحه اول</Button>
          <Button onClick={signOut} variant={"managerButton"}>خروج</Button>
        </div>
      </div>
    </div>
  );
};

export default ManagerHeader;