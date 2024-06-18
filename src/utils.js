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
  }
};
