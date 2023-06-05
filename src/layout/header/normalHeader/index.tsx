import {Button} from "@/component";
import {SlBasket} from "react-icons/sl";
import {FcMultipleSmartphones} from "react-icons/fc";
import {Link} from "react-router-dom";

const NormalHeader = () => {
  return (
    <div className={"flex justify-between bg-[#8130d1] p-2"}>
      <div className={"flex items-center gap-2"}>
        <FcMultipleSmartphones className={"text-2xl"}/>
        <p className={"text-xs text-white"}>موبایل ناصر</p>
      </div>
      <div className={"flex gap-4 text-xs"}>
        <Link to="/login">
          <Button variant={"managerButton"}>مدیریت</Button>
        </Link>
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