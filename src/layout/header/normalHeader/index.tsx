import {Button} from "@/component";
import {SlBasket} from "react-icons/sl";

const NormalHeader = () => {
  return (
    <div className={"flex justify-between bg-[#8130d1] p-2"}>
      <div className={"flex items-center gap-3"}>
        <img src="public/shop-64.png" alt="shop icon" className={"w-12"}/>
        <p className={"text-1xl text-white"}>فروشگاه ناصر</p>
      </div>
      <div className={"flex gap-4"}>
        <Button variant={"managerButton"}>مدیریت</Button>
        <Button variant={"managerButton"}>
          <div className={"flex gap-2 items-center"}>
            <SlBasket/>
            <p>سبد خرید</p>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default NormalHeader;