import axios from "axios";
import {LoginFormValue, NewPriceArrayUpdate} from "@/interfaces";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
});

class APIClient<T> {
  endPoint: string;

  constructor(endPoint: string) {
    this.endPoint = endPoint;
  }

  loginPost = (data: LoginFormValue) => {
    return axiosInstance
      .post<T>(this.endPoint, data)
      .then(result => result.data);
  };

  getAllProduct = () => {
    return axiosInstance
      .get<T>(this.endPoint)
      .then(result => result.data);
  };

  getAllOrders = (cookie: string) => {
    const options = {
      headers: {"Authorization": "Bearer " + cookie}
    };
    return axiosInstance
      .get<T>(this.endPoint, options)
      .then(result => result.data);
  };

  verifyToken = (cookie: string) => {
    const options = {
      headers: {"Authorization": "Bearer " + cookie}
    };
    return axiosInstance
      .get<T>(this.endPoint, options)
      .then(result => result.data);
  };

  getAllSubCategory = () => {
    return axiosInstance
      .get<T>(this.endPoint)
      .then(result => result.data);
  };

  addProduct = (cookie: string, data: FormData) => {
    const options = {
      headers: {"Authorization": "Bearer " + cookie}
    };
    return axiosInstance
      .post<T>(this.endPoint, data, options)
      .then(result => result.data);
  };

  deleteProduct = (cookie: string, id: string) => {
    const options = {
      headers: {"Authorization": "Bearer " + cookie}
    };
    return axiosInstance
      .delete<T>(`${this.endPoint}?id=${id}`, options)
      .then(result => result.data);
  };

  updateProducts = (cookie: string, data: NewPriceArrayUpdate[]) => {
    const options = {
      headers: {"Authorization": "Bearer " + cookie}
    };
    return axiosInstance
      .put<T>(this.endPoint, data, options)
      .then(result => result.data);
  };
}

export default APIClient;