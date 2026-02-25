import { createBrowserRouter } from "react-router";
import { HomePage } from "../page/HomePage";
import { CartPage } from "../page/CartPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/cart",
    Component: CartPage
  }
]);