import {createBrowserRouter} from "react-router-dom";
import {HomePage, LoginPage, MainManagerPage} from "@/pages";

const router = createBrowserRouter([{path: "/", element: <HomePage/>, children: [{}]},
  {
    path: "/login",
    element: <LoginPage/>
  },
  {
    path: "/main-manager-page",
    element: <MainManagerPage/>,
  }]);

export default router;