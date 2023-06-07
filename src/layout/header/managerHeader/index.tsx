import {Button} from "@/component";
import {useLocation, useNavigate} from "react-router";

const ManagerHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentRoute = location.pathname;

  const inventoryProductsHandle = () => {
    navigate('inventory')
  }

  const productsHandle = () => {
    navigate('products')
  }

  const ordersHandle = () => {
    navigate('orders')
  }

  const homeHandle = () => {
    navigate('/')
  }

  return (
    <div className={"flex justify-between bg-[#8130d1] p-2 max-sm:gap-4"}>
      <div className={"flex items-center"}>
        <p className={"text-xs text-white max-sm:text-xl"}>پنل مدیریت فروشگاه</p>
      </div>
      <div className={"flex gap-4 text-xs max-[550px]:flex-col"}>
        <div className={"flex gap-2"}>
          <Button onClick={productsHandle} classes={`max-sm:whitespace-nowrap ${currentRoute === "/main-manager-page/products" ? "bg-green-500" : "bg-[#569aff]"}`} variant={"managerButton"}>کالا ها</Button>
          <Button onClick={inventoryProductsHandle} classes={`max-sm:whitespace-nowrap ${currentRoute === '/main-manager-page/inventory' ? "bg-green-500" : "bg-[#569aff]"}`} variant={"managerButton"}>موجودی و قیمت ها</Button>
        </div>
        <div className={"flex gap-2"}>
          <Button onClick={ordersHandle} classes={`max-sm:whitespace-nowrap ${currentRoute === '/main-manager-page/orders' ? "bg-green-500" : "bg-[#569aff]"}`} variant={"managerButton"}>سفارش ها</Button>
          <Button onClick={homeHandle} variant={"managerButton"}>صفحه اول</Button>
        </div>
      </div>
    </div>
  );
};

export default ManagerHeader;