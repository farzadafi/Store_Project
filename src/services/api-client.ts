import axios from "axios";
import {LoginFormValue} from "@/interfaces";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
})

class APIClient<T> {
  endPoint: string;
  constructor(endPoint:string) {
    this.endPoint = endPoint
  }

  loginPost = (data:LoginFormValue) => {
    return axiosInstance
      .post<T>(this.endPoint, data)
      .then(result => result.data)
  }

  getAllProduct = () => {
    return axiosInstance
      .get<T>(this.endPoint)
      .then(result => result.data)
  }

  getAllOrders = (cookie: string) => {
    const options = {
      headers: {'Authorization': 'Bearer ' + cookie}
    };
    return axiosInstance
      .get<T>(this.endPoint, options)
      .then(result => result.data)
  }

  verifyToken = (cookie: string) => {
    const options = {
      headers: {'Authorization': 'Bearer ' + cookie}
    };
    return axiosInstance
      .get<T>(this.endPoint, options)
      .then(result => result.data)
  }
}


export default APIClient;