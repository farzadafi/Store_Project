import {Button, Input} from "@/component";
import ApiClient from "@/services/api-client";
import {FetchProduct, SubCategory} from "@/interfaces";
import React, {useEffect, useRef, useState} from "react";
import {BsPencilSquare} from "react-icons/bs";
import {RiDeleteBin6Line} from "react-icons/ri";
import {IoIosArrowDown, IoMdArrowRoundBack, IoMdArrowRoundForward} from "react-icons/io";
import {BiSearchAlt} from "react-icons/bi";
import {toast} from "react-toastify";

const ManagerProducts = () => {
    const searchIcon = <BiSearchAlt className={"text-gray-500 w-4 h-4"}/>;
    const [fetchData, setFetchData] = useState<FetchProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [sourceOfTruth, setSourceOfTruth] = useState<FetchProduct[]>([]);
    const [inputValue, setInputValue] = useState<string>("");
    const [currentPage, setCurrentPage] = useState(1);
    let totalProduct = 0;

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
      event.persist();
      // @ts-ignore
      debouncedHandleInputChange(event);
    };

    function debounce<T>(func: { (this: T, event: any): void; apply?: any; }, delay: number | undefined) {
      let timeoutId: number | undefined;
      return function (this: T) {
        const args = arguments;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
      };
    }

    const debouncedHandleInputChange = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
      if (event.target.value === "")
        setFetchData(sourceOfTruth);
      else {
        setFetchData(sourceOfTruth.filter((product) => product.name.toLowerCase().includes(inputValue.toLowerCase())));
      }
    }, 2000);

    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function toggleDropdown() {
      setIsOpen(!isOpen);
    }

    const addClickEventListener = () => {
      document.addEventListener("mousedown", handleClickOutside);
    };

    const removeClickEventListener = () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };

    const handleDropdownRef = (node: HTMLDivElement | null) => {
      dropdownRef.current = node;
      if (node) {
        addClickEventListener();
      } else {
        removeClickEventListener();
      }
    };

    const filterData = (e: React.MouseEvent<HTMLInputElement>) => {
      const inputElement = e.target as HTMLInputElement;
      const id = inputElement.id;
      const lastWord = id.split("-")[2];

      if (lastWord === "همه")
        setFetchData([...sourceOfTruth]);
      else {
        const filteredSubCategories = sourceOfTruth.filter(subCategory => subCategory.subCategoryName === lastWord);
        setFetchData(filteredSubCategories);
      }
    };

    const showWarningToastMessage = () => {
      toast.warning("تو صفحه لاگین بهت گفتم یه چیزی میزنی :|", {
        position: toast.POSITION.TOP_CENTER,
        className: "toast-message"
      });
    };

    const forwardButtonHandle = () => {
      if ( (totalProduct < 10) || currentPage * 10 - 10 + 3 > totalProduct) {
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


    useEffect(() => {
      const fetchSubCategories = async () => {
        try {
          const instance = new ApiClient("/sub-category/find-all");
          const result = await instance.getAllProduct() as Promise<SubCategory>[];
          const formattedResult = result.flatMap((subCategory: any) => {
            return subCategory.subCategories.map((product: { id: string; name: string; image: string; }) => ({
              id: product.id,
              name: product.name,
              image: product.image,
              subCategoryName: subCategory.name,
            }));
          });
          setFetchData(formattedResult);
          setSourceOfTruth(formattedResult);
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
    } else {
      totalProduct = fetchData.length;
    }

    return (
      <div className={"flex flex-col justify-center items-center"}>
        <div className={"flex gap-36 justify-evenly items-center p-4 w-full "}>
          <p className={"text-white whitespace-nowrap"}>مدریریت کالا ها</p>
          <Button classes={"max-sm:h-8 whitespace-nowrap"} variant={"managerButton"}>افزودن کالا</Button>
        </div>
        <div className={"max-w-4xl mt-10 max-sm:w-72 "}>
          <div className="relative overflow-y-auto  h-[30rem] max-sm:h-[25rem] overflow-hidden rounded-xl border max-sm:overflow-x-auto">
            <table className="w-full max-sm:w-[40rem] text-sm text-white dark:text-gray-400 table-fixed">
              <thead className="text-xs text-white uppercase dark:bg-gray-700 dark:text-gray-400 border-b">
              <tr>
                <th className={"py-3 sm:text-center"}>تصویر</th>
                <th className={"py-3 sm:text-center"}>
                  <Input placeHolder={"نام محصول"} icon={searchIcon} type={"text"} name={"search"}
                         onChange={handleInputChange} classes={"bg-white text-black h-8 max-w"}/>
                </th>
                <th className={"py-3 sm:text-center max-sm:text-right max-sm:p-3"}>
                  <div className={"relative"} ref={handleDropdownRef}>
                    <button id="dropdownRadioButton" data-dropdown-toggle="dropdownRadio"
                            className="text-gray-500 bg-white hover:bg-gray-100 rounded-lg text-sm px-3 py-1.5 "
                            type="button" onClick={toggleDropdown}>
                      <p className={"inline-block"}>دسته بندی ها</p>
                      <IoIosArrowDown className={"inline-block mr-2"}/>
                    </button>
                    {isOpen && (
                      <div id="dropdownRadio"
                           className="absolute left-[3.9rem] max-sm:left-[1.9rem] w-24 z-10 shadow dark:bg-gray-700 dark:divide-gray-600"
                           data-popper-placement="top">
                        <ul className="text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownRadioButton">
                          {[{
                            id: "",
                            name: "",
                            image: "",
                            subCategoryName: "همه"
                          }, ...sourceOfTruth]
                            .map((str, _index) => str.subCategoryName)
                            .filter((value, index, self) => self.indexOf(value) === index)
                            .map((uniqueValue, index) => (
                              <li key={index}>
                                <div
                                  className="flex items-center p-1 border-b border-gray-500 rounded-md gap-1 hover:bg-gray-100 bg-white dark:hover:bg-gray-600">
                                  <input onClick={filterData} id={`filter-radio-${uniqueValue}`} type="radio" value=""
                                         name="filter-radio"
                                         className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                  <label htmlFor={`filter-radio-${uniqueValue}`}
                                         className="whitespace-nowrap w-full ml-2 text-xs text-gray-900 rounded dark:text-gray-300">{uniqueValue}</label>
                                </div>
                              </li>
                            ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </th>
                <th className={"py-3 sm:text-center"}>عملیات</th>
              </tr>
              </thead>
              <tbody className={""}>
              {
                fetchData.slice(currentPage * 10 - 10, currentPage * 10).map((product, index) => (
                    <tr className={"border-b dark:bg-gray-800 dark:border-gray-700 text-center "}
                        key={index}>
                      <td
                        className="whitespace-nowrap pl-4 pr-3 text-sm font-medium text-white sm:pl-2 ">
                        <img className="w-12 h-12 max-sm:w-8 max-sm:h-8 flex-shrink-0 mx-auto"
                             src={"data:image/png;base64," + product.image} alt="imageUrl"/>
                      </td>
                      <td className="whitespace-nowrap">{product.name}</td>
                      <td className="">{product.subCategoryName}</td>
                      <td className="whitespace-nowrap py-4 text-sm flex">
                        <Button classes={"max-sm:p-1"} variant={"edit"}>ویرایش
                          <BsPencilSquare/>
                        </Button>
                        <Button classes={"max-sm:p-1"} variant={"remove"}>حذف
                          <RiDeleteBin6Line/>
                        </Button>
                      </td>
                    </tr>
                  )
                )
              }
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
  }
;

export default ManagerProducts;