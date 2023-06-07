import {createBrowserRouter} from "react-router-dom";
import {HomePage, InventoryAndPrices, LoginPage, MainManagerPage, Orders} from "@/pages";
import ManagerProducts from "@/pages/manager/products/ManagerProducts";

const router = createBrowserRouter([{path: "/", element: <HomePage/>, children: [{}]},
  {
    path: "/login",
    element: <LoginPage/>
  },
  {
    path: "/main-manager-page",
    element: <MainManagerPage/>,
    children: [
      {path: "products", element: <ManagerProducts/>},
      {path: "inventory", element: <InventoryAndPrices/>},
      {path: "orders", element: <Orders/>}
    ]
  }]);

export default router;