import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {RouterProvider} from "react-router";
import router from "@/routes";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient();


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}/>
      <ToastContainer/>
    </QueryClientProvider>
  </React.StrictMode>,
);
