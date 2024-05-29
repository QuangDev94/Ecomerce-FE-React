import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import OrderPage from "../pages/OrderPage";
import ProductsPage from "../pages/ProductsPage";

export const routes = [
  {
    path: "/",
    page: <HomePage />,
    isShowHeader: true,
  },
  {
    path: "/order",
    page: <OrderPage />,
    isShowHeader: true,
  },
  {
    path: "/products",
    page: <ProductsPage />,
    isShowHeader: true,
  },
  {
    path: "*",
    page: <NotFoundPage />,
  },
];
