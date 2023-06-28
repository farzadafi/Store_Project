import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {RouterProvider} from "react-router";
import router from "@/routes";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {QueryClient, QueryClientProvider} from "react-query";
import {Provider} from "react-redux";
import configureStore from "@/services/configureStore";

const queryClient = new QueryClient();


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={configureStore}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}/>
        <ToastContainer/>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
);
