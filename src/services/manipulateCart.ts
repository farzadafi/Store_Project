import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface Product {
  id: string,
  name: string,
  price: string
}

interface Product {
  id: string;
  name: string;
  price: string;
  number: number;
}

export const counterSlice = createSlice({
  name: "cartArray",
  initialState: {
    products: [] as Product[]
  },
  reducers: {
    increase: {
      reducer: (state, action: PayloadAction<Product>) => {
        const foundProduct = state.products.find(product => product.id === action.payload.id);
        if(foundProduct === undefined) {
          console.log("here");
          state.products.push({
            id: action.payload.id,
            name: action.payload.name,
            price: action.payload.price,
            number: 1
          });
        }else{
          const foundProductIndex = state.products.findIndex(product => product.id === action.payload.id);
          state.products[foundProductIndex].number += 1;
          console.log(JSON.stringify(state.products));
        }
      },
    },
    decrease: (state, action) => {
    }
  }
});
export const {increase, decrease} = counterSlice.actions;
export default counterSlice.reducer;