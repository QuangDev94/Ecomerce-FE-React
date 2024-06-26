import AdminPage from "../pages/Admin/AdminPage";
import DetailsOrderPage from "../pages/DetailsOrder/DetailsOrderPage";
import HomePage from "../pages/Home/HomePage";
import MyOrderPage from "../pages/MyOrder/MyOrderPage";
import NotFoundPage from "../pages/NotFound/NotFoundPage";
import OrderPage from "../pages/Order/OrderPage";
import OrderSuccessPage from "../pages/OrderSuccess/OrderSuccessPage";
import PaymentPage from "../pages/Payment/PaymentPage";
import ProductDetailPage from "../pages/ProductDetail/ProductDetailPage";
import ProductsPage from "../pages/Products/ProductsPage";
import ProfilePage from "../pages/Profile/ProfilePage";
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
    path: "/my-order",
    page: <MyOrderPage />,
    isShowHeader: true,
  },
  {
    path: "/details-order/:id",
    page: <DetailsOrderPage />,
    isShowHeader: true,
  },
  {
    path: "/payment",
    page: <PaymentPage />,
    isShowHeader: true,
  },
  {
    path: "/order-success",
    page: <OrderSuccessPage />,
    isShowHeader: true,
  },
  {
    path: "/products",
    page: <ProductsPage />,
    isShowHeader: true,
  },
  {
    path: "/products/:type",
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
    path: "/product-detail/:id",
    page: <ProductDetailPage />,
    isShowHeader: true,
  },
  {
    path: "/profile-user",
    page: <ProfilePage />,
    isShowHeader: true,
  },
  {
    path: "/system/admin",
    page: <AdminPage />,
    isShowHeader: false,
    isPrivate: true,
  },
  {
    path: "*",
    page: <NotFoundPage />,
  },
];
