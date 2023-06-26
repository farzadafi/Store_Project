import {useQuery} from "react-query";
import ApiClient from "@/services/api-client";
import {SubCategory} from "@/interfaces";
import {useState} from "react";
import {SingleProductModal} from "@/component";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number,
  description: string,
  subCategoryName: string,
}

const Products = () => {
  const [_loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [staticProduct, setStaticProduct] = useState({});

  const handleModalOpen = (product: Product) => {
    setStaticProduct(product);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const {data: allProductData, isLoading} = useQuery("subCategories", async () => {
    const instance = new ApiClient("/sub-category/find-all");
    const result = await instance.getAllProduct() as Promise<SubCategory>[];
    const formattedResult = result.flatMap((subCategory: any) => {
      return subCategory.subCategories.map((product: { id: string; name: string; price: number; description: string; image: string; quantity: number }) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.description,
        image: product.image,
        subCategoryName: subCategory.name,
        quantity: product.quantity
      }));
    });
    setLoading(false);
    return formattedResult;
  });

  if (isLoading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
        <div>وابس ...</div>
      </div>
    );
  }

  const productsBySubCategory: { [key: string]: Product[] } = allProductData!.reduce((result, product) => {
    const {subCategoryName} = product;
    if (!result[subCategoryName]) {
      result[subCategoryName] = [];
    }
    if (result[subCategoryName].length < 6) {
      const limitedProduct = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        subCategoryName: product.subCategoryName,
        quantity: product.quantity,
        description: product.description
      };
      result[subCategoryName].push({
        ...limitedProduct,
        // id: result[subCategoryName].length + 1
      });
    }
    return result;
  }, {});

  function renderProductList([subCategoryName, products]: [string, Product[]], index: number, _array: [string, Product[]][]) {
    return (
      <div key={index} className={"mt-6 text-white"}>
        <div className={"flex gap-36 justify-evenly items-center p-4 w-full "}>
          {showModal && (
            <div onClick={handleModalClose} className="fixed inset-0 bg-black opacity-5 z-40"></div>
          )}
          {showModal && (
            <SingleProductModal handleClose={handleModalClose} product={staticProduct}/>
          )}
        </div>
        <div className={"flex gap-4 flex-wrap pt-2 justify-center border m-2 rounded-[3rem] flex-col"}>
          <h1 className={"text-center text-[2rem]"}>{subCategoryName}</h1>
          <div className={"flex flex-wrap justify-center gap-12 p-4"}>
            {products.map(product => (
              <div key={product.id} onClick={() => handleModalOpen(product)}
                   className={"w-max flex flex-col hover:cursor-pointer justify-center items-center gap-2 border p-4 rounded-[3rem]"}>
                <img className="w-36 h-36 rounded-[3rem] max-sm:w-8 max-sm:h-8 flex-shrink-0 mx-auto"
                     src={"data:image/png;base64," + product.image} alt={product.name}/>
                <div>
                  <p>{product.name}</p>
                  <p> قیمت: {product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {Object.entries(productsBySubCategory).map(([subCategoryName, products]: [string, Product[]], index: number, array: [string, Product[]][]) =>
        renderProductList([subCategoryName, products], index, array)
      )}
    </div>
  );
};

export default Products;