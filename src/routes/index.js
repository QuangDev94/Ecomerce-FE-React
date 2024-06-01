import HomePage from "../pages/Home/HomePage";
import NotFoundPage from "../pages/NotFound/NotFoundPage";
import OrderPage from "../pages/Order/OrderPage";
import ProductDetailPage from "../pages/ProductDetail/ProductDetailPage";
import ProductsPage from "../pages/Products/ProductsPage";
import SignInPage from "../pages/SignIn/SignInPage";
import SignUpPage from "../pages/SignUp/SignUpPage";
import TypeProductsPage from "../pages/TypeProducts/TypeProductsPage";

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
    path: "/:type",
    page: <TypeProductsPage />,
    isShowHeader: true,
  },
  {
    path: "/sign-in",
    page: <SignInPage />,
    isShowHeader: true,
  },
  {
    path: "/sign-up",
    page: <SignUpPage />,
    isShowHeader: true,
  },
  {
    path: "/product-detail",
    page: <ProductDetailPage />,
    isShowHeader: true,
  },
  {
    path: "*",
    page: <NotFoundPage />,
  },
];
