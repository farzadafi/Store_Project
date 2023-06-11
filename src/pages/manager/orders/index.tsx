import {useEffect, useState} from "react";
import ApiClient from "@/services/api-client";
import {Orders} from "@/interfaces";
import {useCookies} from "react-cookie";
import {Button} from "@/component";
import {TfiThemifyFavicon} from "react-icons/tfi";
import {IoMdArrowRoundBack, IoMdArrowRoundForward} from "react-icons/io";
import {toast} from "react-toastify";

const OrdersProduct = () => {
  const [sourceOfTruth, setSourceOfTruth] = useState<Orders[]>([]);
  const [fetchData, setFetchData] = useState<Orders[]>([]);
  const [loading, setLoading] = useState(true);
  const [cookies] = useCookies(["token"]);
  const token = cookies.token;
  const [currentPage, setCurrentPage] = useState(1);
  let totalProduct = 0;
  const tableHeaderArray = ["نام مشتری", "مجموع مبلغ", "زمان ثبت سفارش", "عملیات"];
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "UTC"
  };
  const formatter = new Intl.DateTimeFormat("en-US", options);

  const showErrorToastMessage = () => {
    toast.warning("تو صفحه لاگین بهت گفتم یه چیزی میزنی :|", {
      position: toast.POSITION.TOP_RIGHT,
      className: "toast-message"
    });
  };

  const forwardButtonHandle = () => {
    if ( (totalProduct < 10) || currentPage * 10 - 10 + 3 > totalProduct) {
      showErrorToastMessage();
    } else
      setCurrentPage(currentPage + 1);
  };

  const backButtonHandle = () => {
    if (currentPage * 10 - 10 === 0)
      showErrorToastMessage();
    else
      setCurrentPage(currentPage - 1);
  };

  const showDeliverOrder = () => {
    const filteredOrders = sourceOfTruth.filter(order => order.isDeliver);
    setFetchData(filteredOrders)
  }

  const showNotDeliverOrder = () => {
    const filteredOrders = sourceOfTruth.filter(order => !order.isDeliver);
    setFetchData(filteredOrders)
  }


  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const instance = new ApiClient("/order/get-all");
        const result = await instance.getAllOrders(token) as Orders[];
        setFetchData(result);
        setSourceOfTruth(result);
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
  } else {
    totalProduct = fetchData.length;
  }

  return (
    <div className={"flex flex-col justify-center items-center"}>
      <div className={"flex justify-between items-center p-2 max-sm:flex-col w-full"}>
        <p className={"whitespace-nowrap max-sm:text-center text-white"}>مدیریت سفارش ها</p>

        <div className={"flex items-center gap-6 max-sm:flex-col max-sm:mt-2"}>
          <div className="flex gap-3 items-center">
            <label htmlFor="default-radio-1" className="text-sm font-medium text-gray-900 dark:text-gray-300">سفارش های
              تحویل شده</label>
            <input type="radio" onClick={showDeliverOrder} name={'default-radio'}
                   className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
          </div>
          <div className="flex gap-3 items-center">
            <label htmlFor="default-radio-2" className="text-sm font-medium text-gray-900 dark:text-gray-300">سفارش های
              در انتظار ارسال</label>
            <input type="radio" name="default-radio" onClick={showNotDeliverOrder}
                   className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
          </div>
        </div>
      </div>
      <div className={"max-w-4xl mt-10 max-sm:w-72"}>
        <div className="relative overflow-y-auto h-[30rem] max-sm:h-[20rem] overflow-hidden rounded-xl border max-sm:overflow-x-auto">
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
              fetchData.slice(currentPage * 10 - 10, currentPage * 10).map((order, index) => (
                  <tr className={"border-b dark:bg-gray-800 dark:border-gray-700 text-center max-sm:text-right"}
                      key={index}>
                    <td className="max-sm:pr-2 p-2 ">
                      <p className={"flex justify-center bg-[#5b1076] min-w-max inline-block p-2 rounded-lg"}>
                        {order.customerName}
                      </p>
                    </td>
                    <td className="max-sm:pr-2 p-2">
                      <p className={"flex justify-center bg-[#5b1076] min-w-max inline-block p-2 rounded-lg"}>
                        {order.totalPrice}
                      </p>
                    </td>
                    <td className="max-sm:pr-2 p-2">
                      <p
                        className={"flex justify-center dir-ltr gap-2 bg-[#5b1076] min-w-max inline-block p-2 rounded-lg"}>
                        {
                          formatter.format(new Date(order.orderTime)).replace(/[-]/g, "/").replace(",", "")
                        }
                      </p>
                    </td>
                    <td className="flex items-center justify-center max-sm:pr-2 p-2">
                      <div>
                        <Button classes={"max-sm:py-2"} variant={"edit"}>
                          <TfiThemifyFavicon/>
                          <p>بررسی سفارش</p>
                        </Button>
                      </div>
                    </td>
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

export default OrdersProduct;