import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddProduct from "./Components/AddProduct/AddProduct.jsx";
import ListProduct from "./Components/ListProduct/ListProduct.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Common layout with navbar
    children: [
      {
        path: "addproduct",
        element: <AddProduct></AddProduct>,
      },
      {
        path: "listproduct",
        element: <ListProduct></ListProduct>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
