import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080"
})

class APIClient<T> {
  endPoint: string;
  constructor(endPoint:string) {
    this.endPoint = endPoint
  }

  get = () => {
    return axiosInstance
      .get<T>(this.endPoint)
      .then((result) => result.data)
  }
}

export default APIClient;