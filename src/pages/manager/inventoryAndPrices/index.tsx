import {useEffect, useState} from "react";
import {SubCategory} from "@/interfaces";
import ApiClient from "@/services/api-client";
import {Button} from "@/component";
import {BsPencilSquare} from "react-icons/bs";

const InventoryAndPrices = () => {
  const [fetchData, setFetchData] = useState<SubCategory[]>([]);
  const [loading, setLoading] = useState(true);

  const tableHeaderArray = ["دسته بندی", "نام کالا", "قیمت", "موجودی"];

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
        <div>یه دقویی وابس...</div>
      </div>
    );
  }

  return (
    <div className={"flex flex-col justify-center items-center"}>
      <div className={"flex justify-between items-center p-2 w-full"}>
        <p className={"text-white"}>مدیریت موجودی و قیمت ها</p>
        <Button classes={"max-sm:h-8"} variant={"managerButton"}>ذخیره</Button>
      </div>

      <div className={"max-w-4xl mt-10"}>
        <div className="relative overflow-y-auto  h-[40rem] max-sm:h-[30rem] overflow-hidden rounded-xl border border-2">
          <table className="w-full max-sm:w-screen text-sm text-white dark:text-gray-400 table-fixed">
            <thead className="text-xs text-white uppercase dark:bg-gray-700 dark:text-gray-400 border-b">
            <tr className={"max-sm:"}>
              {tableHeaderArray.map((str, index) => (
                <th scope="col" className="py-3 sm:text-center max-sm:text-right max-sm:p-3" key={index}>
                  {str}
                </th>
              ))}
            </tr>
            </thead>
            <tbody className={""}>
            {fetchData.map((subCategory) => (
              subCategory.subCategories.map((product, index) => (
                  <tr className={"border-b dark:bg-gray-800 dark:border-gray-700 text-center max-sm:text-right"}
                      key={index}>
                    <td className="max-sm:pr-2 p-2 ">
                      <p className={"flex justify-center bg-[#5b1076] min-w-max inline-block p-2 rounded-lg"}>
                        {subCategory.name}
                      </p>
                    </td>
                    <td className="max-sm:pr-2 p-2">
                      <p className={"flex justify-center bg-[#5b1076] min-w-max inline-block p-2 rounded-lg"}>
                        {product.name}
                      </p>
                    </td>
                    <td className="max-sm:pr-2 p-2">
                      <p className={"flex justify-center gap-2 bg-[#5b1076] min-w-max inline-block p-2 rounded-lg"}>
                        <BsPencilSquare/>
                        {product.price}
                      </p>
                    </td>
                    <td className="max-sm:pr-2 p-2">
                      <p className={"flex justify-center gap-4 bg-[#5b1076] min-w-max inline-block p-2 rounded-lg"}>
                        <BsPencilSquare/>
                        {product.quantity}
                      </p>
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

export default InventoryAndPrices;