import {SetStateAction, useEffect, useState} from "react";
import {FetchInventoryProduct, NewPriceArrayUpdate} from "@/interfaces";
import ApiClient from "@/services/api-client";
import {Button, EditablePrice, EditableQuantity} from "@/component";
import {toast} from "react-toastify";
import {IoMdArrowRoundBack, IoMdArrowRoundForward} from "react-icons/io";
import {useCookies} from "react-cookie";

const InventoryAndPrices = () => {
  const [fetchData, setFetchData] = useState<FetchInventoryProduct[]>([]);
  const [sourceOfTruth, setSourceOfTruth] = useState<FetchInventoryProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  let totalProduct = 0;
  const [newPriceArray, setNewPriceArray] = useState<NewPriceArrayUpdate[]>([]);
  const [isShowCancelButton, setShowCancelButton] = useState(false);
  const [cookies, _setCookie] = useCookies(["token"]);


  const tableHeaderArray = ["دسته بندی", "نام کالا", "قیمت", "موجودی"];

  const showWarningToastMessage = () => {
    toast.warning("تو صفحه لاگین بهت گفتم یه چیزی میزنی :|", {
      position: toast.POSITION.TOP_CENTER,
      className: "toast-message"
    });
  };
  const showSuccessfulToastMessage = () => {
    toast.success("شیرینی آپدیت یادت نره :)", {
      position: toast.POSITION.TOP_CENTER,
      className: "toast-message"
    });
  };

  const showErrorToastMessage = () => {
    toast.error("بعضی وقتا نمیشه اون چیزی که باید بشه :|", {
      position: toast.POSITION.TOP_CENTER,
      className: "toast-message"
    });
  };

  const forwardButtonHandle = () => {
    if ((totalProduct < 10) || currentPage * 10 - 10 + 3 > totalProduct) {
      showWarningToastMessage();
    } else
      setCurrentPage(currentPage + 1);
  };

  const backButtonHandle = () => {
    if (currentPage * 10 - 10 === 0)
      showWarningToastMessage();
    else
      setCurrentPage(currentPage - 1);
  };

  const handleSavePrice = (id: string, price: number, quantity: number): void => {

    let updatedFetchData: SetStateAction<FetchInventoryProduct[]> = [];
    if ((price === -1) && (quantity !== -1)) {
      setNewPriceArray([
        ...newPriceArray, {
          id,
          quantity
        }
      ]);

      updatedFetchData = fetchData.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity,
            isQuantityEdited: true
          };
        }
        return item;
      });
    } else if ((price !== -1) && (quantity === -1)) {
      setNewPriceArray([
        ...newPriceArray, {
          id,
          price
        }
      ]);

      updatedFetchData = fetchData.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            price,
            isPriceEdited: true,
          };
        }
        return item;
      });
    }

    setFetchData(updatedFetchData);
    if (!isShowCancelButton)
      setShowCancelButton(true);
  };

  const onSaveHandler = () => {
    const resultArrayAfterCombine = Object.values(newPriceArray.reduce((acc: { [key: string]: NewPriceArrayUpdate }, curr: NewPriceArrayUpdate) => {
      const id = curr.id;
      if (!acc[id]) {
        acc[id] = {id};
      }
      Object.assign(acc[id], curr);
      return acc;
    }, {}));

    (async () => {
      try {
        const instance = new ApiClient("/product/update");
        await instance.updateProducts(cookies.token, resultArrayAfterCombine).then(r => {
          console.log(r);
          showSuccessfulToastMessage();
        });
      } catch (error) {
        showErrorToastMessage();
      }
    })();
  };

  const cancelEditButton = () => {
    setFetchData(sourceOfTruth);
    setShowCancelButton(false);
    setNewPriceArray([]);
  };

  useEffect(() => {
    (async () => {
      try {
        const instance = new ApiClient("/sub-category/find-all");
        const result = await instance.getAllProduct() as Promise<FetchInventoryProduct>[];
        const formattedResult = result.flatMap((subCategory: any) => {
          return subCategory.subCategories.map((product: { id: string; name: string; price: number; quantity: number }) => ({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: product.quantity,
            subCategoryName: subCategory.name,
            isPriceEdited: false,
            isQuantityEdited: false
          }));
        });
        setFetchData(formattedResult);
        setSourceOfTruth(formattedResult);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
        <div>یه دقویی وابس...</div>
      </div>
    );
  } else {
    totalProduct = fetchData.length;
  }

  return (
    <div className={"flex flex-col justify-center items-center"}>
      <div className={"flex gap-36 justify-evenly items-center p-4 w-full max-sm:gap-24"}>
        <p className={"text-white whitespace-nowrap"}>مدیریت موجودی و قیمت ها</p>
        <div className={"flex gap-2"}>
          {
            isShowCancelButton ?
              <Button onClick={cancelEditButton} classes={"max-sm:h-8 whitespace-nowrap"}
                      variant={"remove"}>لغو</Button> : null
          }
          <Button onClick={onSaveHandler} classes={"max-sm:h-8 whitespace-nowrap"}
                  variant={"managerButton"}>ذخیره</Button>
        </div>
      </div>

      <div className={"max-w-4xl mt-10 max-sm:w-72 "}>
        <div
          className="relative overflow-y-auto h-[30rem] max-sm:h-[25rem] overflow-hidden rounded-xl border max-sm:overflow-x-auto">
          <table className="w-full max-sm:w-[40rem] text-sm text-white dark:text-gray-400 table-fixed">
            <thead className="text-xs text-white uppercase dark:bg-gray-700 dark:text-gray-400 border-b">
            <tr>
              {tableHeaderArray.map((str, index) => (
                <th scope="col" className="py-3 sm:text-center" key={index}>
                  {str}
                </th>
              ))}
            </tr>
            </thead>
            <tbody className={""}>
            {
              // fetchData.map((product, index) => (
              fetchData.slice(currentPage * 10 - 10, currentPage * 10).map((product, index) => (
                  <tr className={"border-b dark:bg-gray-800 dark:border-gray-700 text-center max-sm:text-right"}
                      key={index}>
                    <td className="max-sm:pr-2 p-2 ">
                      <p className={"flex justify-center bg-[#5b1076] min-w-max inline-block p-2 rounded-lg"}>
                        {product.subCategoryName}
                      </p>
                    </td>
                    <td className="max-sm:pr-2 p-2">
                      <p className={"flex justify-center bg-[#5b1076] min-w-max inline-block p-2 rounded-lg"}>
                        {product.name}
                      </p>
                    </td>
                    {
                      product.isPriceEdited ?
                        <EditablePrice classes={"bg-yellow-500"} price={product.price}
                                       onSave={(newPrice) => handleSavePrice(product.id, newPrice, -1)}/> :
                        <EditablePrice price={product.price}
                                       onSave={(newPrice) => handleSavePrice(product.id, newPrice, -1)}/>
                    }
                    {
                      product.isQuantityEdited ?
                        <EditableQuantity classes={"bg-yellow-500"} quantity={product.quantity}
                                          onSave={(newQuantity) => handleSavePrice(product.id, -1, newQuantity)}/> :
                        <EditableQuantity quantity={product.quantity}
                                          onSave={(newQuantity) => handleSavePrice(product.id, -1, newQuantity)}/>
                    }
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
        <nav className="flex items-center justify-between pt-4" aria-label="Table navigation">
          <span className="text-sm font-normal text-white dark:text-gray-400">موارد <span
            className="font-semibold text-black dark:text-white">{currentPage * 10 - 10 + 1}{" - "}{currentPage * 10}</span> از <span
            className="font-semibold text-black dark:text-white">{totalProduct}</span> <span>محصول</span>   </span>
          <ul className="inline-flex items-center -space-x-px">
            <li>
              <a onClick={forwardButtonHandle}
                 className="hover:cursor-pointer block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <span className="sr-only">Next</span>
                <IoMdArrowRoundForward/>
              </a>
            </li>
            <li>
              <a onClick={backButtonHandle}
                 className="hover:cursor-pointer block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <span className="sr-only">Previous</span>
                <IoMdArrowRoundBack/>
              </a>
            </li>
          </ul>
        </nav>

      </div>
    </div>
  );
};

export default InventoryAndPrices;