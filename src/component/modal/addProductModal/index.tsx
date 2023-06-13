import {Button, FormikInput} from "@/component";
import {IoIosCloseCircleOutline} from "react-icons/io";
import {ErrorMessage, Field, Form, Formik, useFormik} from "formik";
import {
  ProductFormValue,
  ProductSaveError,
  SubCategoryName,
} from "@/interfaces";
import ApiClient from "@/services/api-client";
import {MdDriveFileRenameOutline} from "react-icons/md";
import React, {useEffect, useState} from "react";

const closeIcon = <IoIosCloseCircleOutline className={"w-5 h-5 text-red-500"}/>;
const productName = <MdDriveFileRenameOutline className={"text-gray-500"}/>;

const initialValues: ProductFormValue = {
  productImage: new File([""], "default.jpg", {type: "image/jpeg"}),
  productName: "",
  categoryId: "",
  description: "",
};

interface TextareaFieldProps {
  field: {
    name: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onBlur: () => void;
  };
}

const AddProductModal = ({handleClose}) => {
  const [fetchData, setFetchData] = useState<SubCategoryName[]>([]);

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const instance = new ApiClient("/sub-category/find-all-name");
        const result = await instance.getAllSubCategory() as SubCategoryName[];
        setFetchData(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSubCategories();
  }, []);

  const formik = useFormik({
    initialValues: {
      productImage: new File([""], "default.jpg", {type: "image/jpeg"}),
    },
    onSubmit: values => {
      console.log(values);
    },
  });

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
            <Formik initialValues={initialValues} validate={values => {
              const errors: ProductSaveError = {};

              if (values.productImage.name === 'default.jpg')
                errors.productImage = "هوووووووووووووووی";

              if (!values.productName)
                errors.productName = "چی میزنی؟";
              else if (/^.{0,3}$/.test(values.productName))
                errors.productName = "تو زندگیت سعی کن آدم باشی";

              if (values.categoryId === "") {
                errors.categoryId = "سلکت بار نرفت تو چشت؟";
              }

              if (!values.description)
                errors.description = "بنویس چند تا جمله دیگه";
              else if (/^.{0,20}$/.test(values.description))
                errors.description = "۲۰ تا کاراکتر بنویس انصافا";

              return errors;
            }}

                    onSubmit={(values, {setSubmitting}) => {
                      setTimeout(() => {
                        // console.log(values.productImage);
                        // values.productImage = formik.values.productImage.prototype
                        // console.log(values.productImage);
                        // const instance = new ApiClient("/api/login/getToken");
                        // const resultCall = instance.loginPost(values) as Promise<ResultMessage>;
                        // resultCall.then((result: ResultMessage) => {
                        // }).catch((error: ResultMessage) => {
                        // });
                        setSubmitting(false);
                      }, 400);

                    }}>
              {() => (
                <Form>
                  <div className={"flex flex-col gap-6"}>
                    <div className="flex items-center justify-center w-full">
                      <label htmlFor="dropzone-file"
                             className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none"
                               stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                          </svg>
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">برای آپلود عکس کلیک کنید</span> یا تصویر را کشیده و در اینجا
                            رها کنید </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX 300KB)</p>
                        </div>
                        <Field name="image">
                          {({field}: TextareaFieldProps) => (
                            <input
                              {...field} id="dropzone-file" type="file" className="hidden" onChange={(event) => {
                              formik.setFieldValue("productImage", event.currentTarget.files?.[0]);
                            }}/>
                          )}
                        </Field>
                      </label>
                    </div>
                    <ErrorMessage name="productImage" component="div" className={"text-red-500 text-xs mt-2"}/>
                    <div>
                      <FormikInput variant={"addProduct"} icon={productName} type={"text"} name={"productName"}
                                   placeHolder={"نام کالا"}/>
                      <ErrorMessage name="productName" component="div" className={"text-red-500 text-xs mt-2"}/>
                    </div>
                    <div>
                      <Field
                        className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                        as={"select"} name={"categoryId"}>
                        {[
                          <option key="0" value="">
                            دسته بندی </option>,
                          fetchData
                            .filter(subCategory => subCategory.id)
                            .map(subCategory => (
                              <option key={subCategory.id} value={subCategory.id}>
                                {subCategory.name}
                              </option>
                            ))
                        ]}
                      </Field>
                      <ErrorMessage name="categoryId" component="div" className={"text-red-500 text-xs mt-2"}/>
                    </div>
                    <div>
                      <Field name="description">
                        {({field}: TextareaFieldProps) => (
                          <textarea
                            {...field}
                            className="block p-2.5 w-full h-36 resize-none text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="توضیحات"/>
                        )}
                      </Field>
                      <ErrorMessage name="description" component="div" className="text-red-500 text-xs"/>
                    </div>
                    <div className={"flex gap-2"}>
                      <div className={"w-[20rem]"}>
                        <Button onClick={handleClose} type={"button"} classes={"bg-red-500 w-full flex justify-center"}
                                variant={"common"}>لغو</Button>
                      </div>
                      <div className={"w-[20rem]"}>
                        <Button type={"submit"} classes={"bg-blue-500 w-full flex justify-center"}
                                variant={"common"}>ذخیره</Button>
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;