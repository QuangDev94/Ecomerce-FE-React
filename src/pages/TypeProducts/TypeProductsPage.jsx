import React, { useState } from "react";
import NavbarComponent from "../../components/Navbar/NavbarComponent";
import CardComponent from "../../components/Card/CardComponent";
import { Col, Pagination, Row } from "antd";
import { WrapperNavbar, WrapperProductsType } from "./style";
import { useLocation } from "react-router-dom";
import * as ProductService from "../../services/ProductService";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading/Loading";

const TypeProductsPage = () => {
  const limit = 5;
  const [page, setPage] = useState(0);
  const { state } = useLocation();
  const fetchProductType = async (type, page, limit) => {
    const res = await ProductService.getProductType(type, page, limit);
    return res.response;
  };
  const { isLoading, data: products } = useQuery({
    queryKey: ["products", state, page, limit],
    queryFn: () => fetchProductType(state, page, limit),
    retry: 3,
    retryDelay: 1000,
  });
  const onChangePagination = (current) => {
    setPage(current - 1);
  };

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
            pageSize={limit}
            total={products?.total}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onChange={onChangePagination}
          />
        </Col>
      </Row>
    </Loading>
  );
};

export default TypeProductsPage;
