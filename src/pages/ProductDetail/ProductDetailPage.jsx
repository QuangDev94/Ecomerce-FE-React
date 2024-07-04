import React from "react";
import ProductDetailComponent from "../../components/ProductDetail/ProductDetailComponent";
import { useParams } from "react-router-dom";
import { WrraperContainer } from "../Home/style";

const ProductDetailPage = () => {
  const { id } = useParams();
  return (
    <>
      <h5 style={{ fontSize: "16px", textAlign: "center" }}>
        Home Page - Product Details
      </h5>
      <WrraperContainer
        style={{
          paddingTop: "30px",
          paddingBottom: "30px",
          background: "#efefef",
        }}>
        <ProductDetailComponent idProduct={id} />
      </WrraperContainer>
    </>
  );
};

export default ProductDetailPage;
