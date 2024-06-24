import React from "react";
import ProductDetailComponent from "../../components/ProductDetail/ProductDetailComponent";
import { useParams } from "react-router-dom";

const ProductDetailPage = () => {
  const { id } = useParams();
  return (
    <>
      <h5 style={{ fontSize: "14px", padding: "0 120px" }}>
        Home Page - Product Details
      </h5>
      <div
        style={{
          padding: "20px 120px",
          background: "#efefef",
          height: "1000px",
        }}>
        <ProductDetailComponent idProduct={id} />
      </div>
    </>
  );
};

export default ProductDetailPage;
