import {Button} from "@/component";
import {IoIosCloseCircleOutline} from "react-icons/io";

const closeIcon = <IoIosCloseCircleOutline className={"w-5 h-5 text-red-500"}/>;

const AddProductModal = ({handleClose}) => {
  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="px-6 py-6 lg:px-8 flex flex-col gap-6">
            <div className={"flex justify-between"}>
              <h3>افزودن کالا</h3>
              <Button onClick={handleClose} variant={""}>
                {
                  closeIcon
                }
              </Button>
            </div>
            <div className="flex items-center justify-center w-full">
              <label htmlFor="dropzone-file"
                     className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor"
                       viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">برای آپلود عکس کلیک کنید</span> یا
                    تصویر را کشیده و در اینجا رها کنید</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX 300KB)</p>
                </div>
                <input id="dropzone-file" type="file" className="hidden"/>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;