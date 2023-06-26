import {Button} from "@/component";
import {IoIosCloseCircleOutline} from "react-icons/io";

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
  product: Product
}

const closeIcon = <IoIosCloseCircleOutline className={"w-5 h-5 text-red-500"}/>;


const SingleProductModal = ({handleClose, product}: Props) => {

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="px-6 py-6 lg:px-8 flex flex-col gap-6">
            <div className={"flex justify-between"}>
              <h3>افزودن کالا</h3>
              <Button onClick={handleClose} classes={""} variant={""}>
                {
                  closeIcon
                }
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductModal;