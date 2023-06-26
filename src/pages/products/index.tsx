import {useQuery} from "react-query";
import ApiClient from "@/services/api-client";
import {SubCategory} from "@/interfaces";
import {useState} from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const Products = () => {
  const [_loading, setLoading] = useState(true);


  const {data: allProductData, isLoading} = useQuery("subCategories", async () => {
    const instance = new ApiClient("/sub-category/find-all");
    const result = await instance.getAllProduct() as Promise<SubCategory>[];
    const formattedResult = result.flatMap((subCategory: any) => {
      return subCategory.subCategories.map((product: { id: string; name: string; price: number; description: string; image: string; }) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.description,
        image: product.image,
        subCategoryName: subCategory.name,
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
        name: product.name,
        price: product.price,
        image: product.image
      };
      result[subCategoryName].push({
        ...limitedProduct,
        id: result[subCategoryName].length + 1
      });
    }
    return result;
  }, {});

  function renderProductList([subCategoryName, products]: [string, Product[]], index: number, _array: [string, Product[]][]) {
    return (
      <div key={index} className={"mt-6 text-white"}>
        <div className={"flex gap-12 flex-wrap pt-4 justify-center border m-2 rounded-[3rem] flex-col"}>
          <h1 className={"text-center"}>{subCategoryName}</h1>
          <div className={"flex flex-wrap justify-center gap-12"}>
            {products.map(product => (
              <div key={product.id}
                   className={"w-max flex flex-col mb-4 justify-center items-center gap-2 border p-4 rounded-[3rem]"}>
                <img className="w-44 h-44 rounded-[3rem] max-sm:w-8 max-sm:h-8 flex-shrink-0 mx-auto"
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