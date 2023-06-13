export interface LoginFormValue {
  username: string,
  password: string
}

export interface LoginErrors {
  username?: string;
  password?: string;
}

export interface ProductFormValue {
  productImage: File,
  productName: string;
  categoryId: string;
  description: string;
}

export interface ProductSaveError {
  productImage?: string,
  productName?: string,
  categoryId?: string,
  description?: string
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
  subCategoryName: string
}

export interface FetchInventoryProduct {
  id: string,
  name: string,
  subCategoryName: string,
  price: number,
  quantity: number
}

export interface Orders {
  id: string,
  customerName: string,
  address: string,
  phoneNumber: string,
  isDeliver: boolean,
  deliverTime: string,
  orderTime: string,
  totalPrice: number,
  purchaseOrders: PurchaseOrder[]
}

interface PurchaseOrder {
  id: string
  productId: string,
  productName: string,
  productPrice: number
}

export interface SubCategoryName {
  id: string,
  name: string
}