import OrderAdmin from "./components/Admin/OrderAdmin";
import ProductAdmin from "./components/Admin/ProductAdmin";
import UserAdmin from "./components/Admin/UserAdmin";

export const isJsonString = (data) => {
  try {
    JSON.parse(data);
    return true;
  } catch (error) {
    return false;
  }
};

export const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader?.readAsDataURL(file);
    reader.onload = () => resolve(reader?.result);
    reader.onerror = (error) => reject(error);
  });

export const renderPage = (key) => {
  switch (key) {
    case "user":
      return <UserAdmin />;
    case "product":
      return <ProductAdmin />;
    case "order":
      return <OrderAdmin />;
  }
};

export const convertPrice = (price) => {
  try {
    const priceFormat =
      price?.toLocaleString().replaceAll(",", ".") + " " + "$";
    return priceFormat;
  } catch (error) {
    return null;
  }
};

export const initFacebookSDK = () => {
  if (window.FB) {
    window.FB.XFBML.parse();
  }
  let locale = "vi_VN";
  window.fbAsyncInit = function () {
    window.FB.init({
      appId: process.env.REACT_APP_FB_ID, // You App ID
      cookie: true, // enable cookies to allow the server to access
      // the session
      xfbml: true, // parse social plugins on this page
      version: "v2.1", // use version 2.1
    });
  };
  // Load the SDK asynchronously
  (function (d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = `//connect.facebook.net/${locale}/sdk.js`;
    fjs.parentNode.insertBefore(js, fjs);
  })(document, "script", "facebook-jssdk");
};
