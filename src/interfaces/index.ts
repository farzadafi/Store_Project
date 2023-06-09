export interface LoginFormValue {
  username: string,
  password: string
}

export interface LoginErrors {
  username?: string;
  password?: string;
}

export interface ResultMessage {
  message: string,
  code: number
}

export interface SubCategory {
  id: string;
  name: string;
  categoryId: string;
  subCategories: Product[];
}

export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
  rate: number;
  image: string;
  subCategoryId: string;
}

export interface FetchProduct {
  id: string,
  name: string,
  image: string,
  subCategoryName:string
}