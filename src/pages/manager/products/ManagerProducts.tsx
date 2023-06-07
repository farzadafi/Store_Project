import {Button} from "@/component";
import ApiClient from "@/services/api-client";
import {SubCategory} from "@/interfaces";
import {useEffect, useState} from "react";
import {BsPencilSquare} from "react-icons/bs";
import {RiDeleteBin6Line} from "react-icons/ri";
import {IoIosArrowDown} from "react-icons/io";

const ManagerProducts = () => {
  const [fetchData, setFetchData] = useState<SubCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const instance = new ApiClient("/sub-category/find-all");
        const result = await instance.getAllProduct() as Promise<SubCategory>[];
        const formattedResult = result.map((subCategory: any) => {
          return {
            id: subCategory.id,
            name: subCategory.name,
            categoryId: subCategory.categoryId,
            subCategories: subCategory.subCategories
              ? subCategory.subCategories.map((product: any) => {
                return {
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  quantity: product.quantity,
                  description: product.description,
                  rate: product.rate,
                  image: product.image,
                  subCategoryId: product.subCategoryId
                };
              })
              : []
          };
        });
        setFetchData(formattedResult);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSubCategories();
  }, []);

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
        <div>مدیر باید صبور باشه...</div>
      </div>
    );
  }

  return (
    <div className={"flex flex-col justify-center items-center"}>
      <div className={"flex justify-between items-center p-2 w-full"}>
        <p>مدریریت کالا ها</p>
        <Button classes={"max-sm:h-8"} variant={"managerButton"}>افزودن کالا</Button>
      </div>

      <div className={"max-w-4xl mt-10"}>
        <div className="relative overflow-y-auto  h-[40rem] max-sm:h-[30rem] overflow-hidden rounded-xl border">
          <table className="w-full max-sm:w-screen text-sm text-white dark:text-gray-400 table-fixed">
            <thead className="text-xs text-white uppercase dark:bg-gray-700 dark:text-gray-400 border-b">
            {/*<tr className={"max-sm:"}>*/}
            {/*  {tableHeaderArray.map((str, index) => (*/}
            {/*    <th scope="col" className="py-3 sm:text-center max-sm:text-right max-sm:p-3" key={index}>*/}
            {/*      {str}*/}
            {/*    </th>*/}
            {/*  ))}*/}
            {/*</tr>*/}

            <tr>
              <th className={"py-3 sm:text-center max-sm:text-right max-sm:p-3"}>تصویر</th>
              <th className={"py-3 sm:text-center max-sm:text-right max-sm:p-3"}>

              </th>
              <th className={"py-3 sm:text-center max-sm:text-right max-sm:p-3"}>
                <div className={"relative"}>
                  <button id="dropdownRadioButton" data-dropdown-toggle="dropdownRadio"
                          className="text-gray-500 bg-white hover:bg-gray-100 rounded-lg text-sm px-3 py-1.5 "
                          type="button">
                    <p className={"inline-block"}>دسته بندی ها</p>
                    <IoIosArrowDown className={"inline-block mr-2"}/>
                  </button>
                  <div id="dropdownRadio"
                       className="absolute left-[3.9rem] w-24 z-10 shadow dark:bg-gray-700 dark:divide-gray-600"
                       data-popper-placement="top">
                    <ul className="text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownRadioButton">
                      {fetchData.map((str, index) => (
                        <li key={index}>
                          <div
                            className="flex items-center p-1 border-b rounded-md gap-1 hover:bg-gray-100 bg-white dark:hover:bg-gray-600">
                            <input id="filter-radio-example-1" type="radio" value="" name="filter-radio"
                                   className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                            <label htmlFor="filter-radio-example-1"
                                   className="whitespace-nowrap w-full ml-2 text-xs text-gray-900 rounded dark:text-gray-300">{str.name}</label>
                          </div>
                        </li>
                      ))}

                    </ul>
                  </div>
                </div>
              </th>
              <th className={"py-3 sm:text-center max-sm:text-right max-sm:p-3"}>عملیات</th>
            </tr>
            </thead>
            <tbody className={""}>
            {fetchData.map((subCategory) => (
              subCategory.subCategories.map((product, index) => (
                  <tr className={"border-b dark:bg-gray-800 dark:border-gray-700 text-center max-sm:text-right"}
                      key={index}>
                    <td
                      className="whitespace-nowrap pl-4 pr-3 text-sm max-sm:pl-12 font-medium text-white sm:pl-2 max-sm:text-right">
                      <img className="w-12 h-12 max-sm:w-8 max-sm:h-8 flex-shrink-0 mx-auto"
                           src={"data:image/png;base64," + product.image} alt="imageUrl"/>
                    </td>
                    <td className="whitespace-nowrap max-sm:pl-24">{product.name}</td>
                    <td className="max-sm:pr-2">{subCategory.name}</td>
                    <td className="whitespace-nowrap py-4 text-sm flex">
                      <Button classes={"max-sm:p-0"} variant={"edit"}>ویرایش
                        <BsPencilSquare/>
                      </Button>
                      <Button classes={"max-sm:p-0"} variant={"remove"}>حذف
                        <RiDeleteBin6Line/>
                      </Button>
                    </td>
                  </tr>
                )
              )))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManagerProducts;