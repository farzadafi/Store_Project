import {Button, Input} from "@/component";
import {IoIosCloseCircleOutline} from "react-icons/io";
import {useState} from "react";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
import {increase} from "@/services/manipulateCart";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number,
  description: string,
  subCategoryName: string,
}

interface Props {
  handleClose: () => void;
  product: Product;
}

const closeIcon = <IoIosCloseCircleOutline className={"w-5 h-5 text-red-500"}/>;


const SingleProductModal = ({handleClose, product}: Props) => {
  const [isCorrect, setCorrect] = useState(false);
  const dispatch = useDispatch()


  const showWarningToastMessage = () => {
    toast.warning("گونی آوردی میخوای " + product.quantity + " تا گوشی ببری؟؟", {
      position: toast.POSITION.TOP_CENTER,
      className: "toast-message"
    });
  };

  const checkQuantity = (e: { target: { valueAsNumber: any; }; }) => {
    if (e.target.valueAsNumber > product.quantity) {
      showWarningToastMessage()
      setCorrect(true);
    }
    else
      setCorrect(false);
  };

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-lg max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="px-6 py-6 lg:px-8 flex flex-col gap-6">
            <div className={"flex justify-between"}>
              <Button onClick={handleClose} classes={""} variant={""}>
                {
                  closeIcon
                }
              </Button>
            </div>
            <div className={"text-black flex flex-col gap-5"}>
              <div className={"flex gap-5"}>
                <div>
                  <img className="max-sm:w-8 max-sm:h-8 flex-shrink-0 mx-auto"
                       src={"data:image/png;base64," + product.image} alt={product.name}/>
                </div>
                <div className={"flex justify-end items-end flex-col gap-3"}>
                  <p>{product.name}</p>
                  <p>{product.subCategoryName}</p>
                  <p>{product.price}</p>
                  <Input onChange={checkQuantity} placeHolder={""} icon={""} type={"number"} name={"number"}
                         classes={`w-[5rem]`}/>
                  <Button variant={"managerButton"} onClick={() => dispatch(increase({ id: product.id, name: product.name, price: product.price }))} disabled={isCorrect}
                          classes={`${isCorrect ? "bg-gray-500 cursor-not-allowed" : ""}`}>افزودن</Button>
                </div>
              </div>
              <div>{product.description}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductModal;