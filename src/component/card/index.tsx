import {Button} from "@/component";
import {BsPencilSquare} from "react-icons/bs";
import {RiDeleteBin6Line} from "react-icons/ri";

interface Props {
  image: string,
  name: string,
  subCategory: string,
  price: number
}

const Card = ({image, name, price, subCategory}:Props) => {
  return (
    <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <li className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200">
        <div className="flex-1 flex flex-col p-8">
          <img className="w-32 h-32 flex-shrink-0 mx-auto rounded-full" src={"data:image/png;base64," + image} alt="imageUrl"/>
          <h3 className="mt-6 text-gray-900 text-sm font-medium">{name}</h3>
          <dl className="mt-1 flex-grow flex flex-col justify-between">
            <dt className="sr-only">Name</dt>
            <dd className="text-gray-500 text-sm">{subCategory}</dd>
            <dt className="sr-only">Price</dt>
            <dd className="mt-3">
                <span className="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                  {price}
                </span>
            </dd>
          </dl>
        </div>
        <div>
          <div className="-mt-px flex divide-x divide-gray-200">
            <div className="w-0 flex-1 flex">
              <Button
                variant={"remove"}>
                <RiDeleteBin6Line/>
                <span className="ml-3">حذف</span>
              </Button>
            </div>
            <div className="-ml-px w-0 flex-1 flex">
              <Button 
                 classes="" variant={"edit"}>
                <BsPencilSquare/>
                <span className="ml-3">ویرایش</span>
              </Button>
            </div>
          </div>
        </div>
      </li>
    </ul>
  );
};

export default Card;