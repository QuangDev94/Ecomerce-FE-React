import React, { useState } from "react";
import NavbarComponent from "../../components/Navbar/NavbarComponent";
import CardComponent from "../../components/Card/CardComponent";
import { Col, Pagination, Row } from "antd";
import { WrapperNavbar, WrapperProductsType } from "./style";
import { useLocation } from "react-router-dom";
import * as ProductService from "../../services/ProductService";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading/Loading";
import { WrraperContainer } from "../Home/style";
import { useViewport } from "../../hooks/useViewport";

const TypeProductsPage = () => {
  const limit = 8;
  const [page, setPage] = useState(0);
  const { state } = useLocation();
  const viewPort = useViewport();

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
    <>
      <h5 style={{ fontSize: "16px", background: "#fff", textAlign: "center" }}>
        {`Home Page - Products ${state}`}
      </h5>
      <WrraperContainer style={{ background: "#efefef" }}>
        <Loading spinning={isLoading}>
          <Row
            style={{
              flexWrap: "nowrap",
              paddingTop: "10px",
              paddingBottom: "60px",
            }}>
            <WrapperNavbar span={viewPort.width < 770 ? 0 : 4}>
              <NavbarComponent />
            </WrapperNavbar>
            <Col span={viewPort.width < 770 ? 24 : 20}>
              <Row>
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
              </Row>
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
      </WrraperContainer>
    </>
  );
};

export default TypeProductsPage;
