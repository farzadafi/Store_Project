import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {toast} from "react-toastify";

interface Product {
  id: string,
  name: string,
  price: number,
  number: number,
  quantity?: number
}

const showWarningToastMessage = () => {
  toast.warning("عجب خریه این بازیکن",{
    position: toast.POSITION.TOP_CENTER,
    className: "toast-message"
  });
};

export const counterSlice = createSlice({
  name: "cartArray",
  initialState: {
    products: [] as Product[]
  },
  reducers: {
    increase: {
      reducer: (state, action: PayloadAction<Product>) => {
        const foundProduct = state.products.find(product => product.id === action.payload.id);
        if (foundProduct === undefined) {
          if(action.payload.quantity! >= action.payload.number) {
            state.products.push({
              id: action.payload.id,
              name: action.payload.name,
              price: action.payload.price,
              number: action.payload.number
            });
          }else{
            showWarningToastMessage();
          }
        } else {
          const foundProductIndex = state.products.findIndex(product => product.id === action.payload.id);
          if(state.products[foundProductIndex].number + action.payload.number > action.payload.quantity!)
            showWarningToastMessage()
          else
            state.products[foundProductIndex].number += action.payload.number;
          console.log(JSON.stringify(state.products));
        }
      },
      prepare: (product: Product) => {
        return { payload: product };
      }
    },
    decrease: (_state, _action) => {}
  }
});
export const {increase, decrease} = counterSlice.actions;
export default counterSlice.reducer;