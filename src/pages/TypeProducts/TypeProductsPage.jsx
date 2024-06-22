import React from "react";
import NavbarComponent from "../../components/Navbar/NavbarComponent";
import CardComponent from "../../components/Card/CardComponent";
import { Col, Pagination, Row } from "antd";
import { WrapperNavbar, WrapperProductsType } from "./style";
import { useLocation } from "react-router-dom";
import * as ProductService from "../../services/ProductService";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading/Loading";

const TypeProductsPage = () => {
  const { state } = useLocation();
  const fetchProductType = async (type) => {
    const res = await ProductService.getProductType(type);
    return res.response;
  };
  const {
    isLoading,
    data: products,
    isPlaceholderData,
  } = useQuery({
    queryKey: ["products", state],
    queryFn: () => fetchProductType(state),
    retry: 3,
    retryDelay: 1000,
    placeholderData: (prev) => prev,
  });
  console.log(products);
  return (
    <Loading spinning={isLoading}>
      <Row
        style={{
          padding: "0 120px",
          background: "#efefef",
          flexWrap: "nowrap",
          paddingTop: "10px",
          height: "100vh",
        }}>
        <WrapperNavbar span={4}>
          <NavbarComponent />
        </WrapperNavbar>
        <Col span={20}>
          <WrapperProductsType>
            {products?.data?.map((product) => {
              return (
                <CardComponent
                  key={product._id}
                  id={product._id}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  rating={product.rating}
                  type={product.type}
                  description={product.description}
                  countInStock={product.countInStock}
                  discount={product.discount}
                  solded={product.solded}
                />
              );
            })}
          </WrapperProductsType>
          <Pagination
            defaultCurrent={1}
            total={50}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        </Col>
      </Row>
    </Loading>
  );
};

export default TypeProductsPage;
