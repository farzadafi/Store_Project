import {Button, Card} from "@/component";
import ApiClient from "@/services/api-client";
import {SubCategory} from "@/interfaces";
import {useEffect, useState} from "react";

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
    <div>
      <div className={"flex justify-between items-center p-2"}>
        <p>مدریریت کالا ها</p>
        <Button classes={"max-sm:h-8"} variant={"managerButton"}>افزودن کالا</Button>
      </div>
      <div>
        {fetchData.map(subCategory => (
          <div key={subCategory.id}>
            <div>
              {subCategory.subCategories.map(product => (
                <Card key={product.id} image={product.image} name={product.name} price={product.price}
                      subCategory={subCategory.name}/>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagerProducts;