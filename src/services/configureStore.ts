import { configureStore } from '@reduxjs/toolkit'
import {counterSlice} from "@/services/manipulateCart";
export default configureStore({
  reducer: {
    cartArray : counterSlice.reducer
  }
})