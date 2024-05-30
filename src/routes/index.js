import HomePage from "../pages/Home/HomePage";
import NotFoundPage from "../pages/NotFound/NotFoundPage";
import OrderPage from "../pages/Order/OrderPage";
import ProductsPage from "../pages/Products/ProductsPage";

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
