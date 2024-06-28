import React from "react";
import {
  WrapperAllPrice,
  WrapperContentInfo,
  WrapperHeaderUser,
  WrapperInfoUser,
  WrapperItem,
  WrapperItemLabel,
  WrapperLabel,
  WrapperNameProduct,
  WrapperProduct,
  WrapperStyleContent,
} from "./style";
import { useLocation, useParams } from "react-router-dom";
import * as OrderService from "../../services/OrderService";
import { useQuery } from "@tanstack/react-query";
import { orderContant } from "../../contant";
import { convertPrice } from "../../utils";
import { useMemo } from "react";
import Loading from "../../components/Loading/Loading";

const DetailsOrderPage = () => {
  const params = useParams();
  const { id } = params;
  const location = useLocation();
  const { state } = location;

  const fetchDetailsOrder = async () => {
    const res = await OrderService.getDetailsOrder(id, state?.access_token);
    return res.data;
  };

  const queryOrder = useQuery({
    queryKey: ["orders-details"],
    queryFn: fetchDetailsOrder,
    retry: 3,
    retryDelay: 1000,
    refetchInterval: 0,
    refetchOnWindowFocus: true,
    enabled: Boolean(id),
  });
  const { isLoading, data } = queryOrder;

  console.log("data: ", data);
  const priceMemo = useMemo(() => {
    const result = data?.orderItems?.reduce((total, cur) => {
      return total + cur.price * cur.amount;
    }, 0);
    return result;
  }, [data]);

  return (
    <Loading spinning={isLoading}>
      <div
        style={{
          background: "#f5f5fa",
          with: "100%",
        }}>
        <div
          style={{
            background: "#f5f5fa",
            with: "100%",
            height: "100vh",
            padding: "0 120px",
          }}>
          <h4
            style={{
              fontWeight: "bold",
              paddingTop: "20px",
              marginTop: 0,
              fontSize: "14px",
            }}>
            Order Details
          </h4>
          <WrapperHeaderUser>
            <WrapperInfoUser>
              <WrapperLabel>User Address : </WrapperLabel>
              <WrapperContentInfo>
                <div className="name-info">
                  <span>Name: </span> {data?.shippingAddress?.fullName}
                </div>
                <br></br>
                <div className="address-info">
                  <span>Address: </span>{" "}
                  {`${data?.shippingAddress?.address} ${data?.shippingAddress?.city}`}
                </div>
                <div className="phone-info">
                  <span>Phone: </span> {data?.shippingAddress?.phone}
                </div>
              </WrapperContentInfo>
            </WrapperInfoUser>
            <WrapperInfoUser>
              <WrapperLabel>Delivery methods</WrapperLabel>
              <WrapperContentInfo>
                <div className="delivery-info">
                  <span className="name-delivery">FAST </span>Delivery of
                  savings
                </div>
                <div className="delivery-fee">
                  <span>Delivery charges : </span> {data?.shippingPrice}
                </div>
              </WrapperContentInfo>
            </WrapperInfoUser>
            <WrapperInfoUser>
              <WrapperLabel>Payment methods</WrapperLabel>
              <WrapperContentInfo>
                <div className="payment-info">
                  {orderContant.payment[data?.paymentMethod]}
                </div>
                <div className="status-payment">
                  {data?.isPaid ? "Paided" : "Unpaid"}
                </div>
              </WrapperContentInfo>
            </WrapperInfoUser>
          </WrapperHeaderUser>
          <WrapperStyleContent>
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
              <div style={{ width: "670px" }}>Product: </div>
              <WrapperItemLabel>Price</WrapperItemLabel>
              <WrapperItemLabel>Amount</WrapperItemLabel>
              <WrapperItemLabel>Discount</WrapperItemLabel>
            </div>
            {data?.orderItems?.map((order) => {
              return (
                <WrapperProduct key={order._id}>
                  <WrapperNameProduct>
                    <img
                      src={order?.image}
                      style={{
                        width: "70px",
                        height: "70px",
                        objectFit: "cover",
                        border: "1px solid rgb(238, 238, 238)",
                        padding: "2px",
                      }}
                    />
                    <div
                      style={{
                        width: 260,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        marginLeft: "10px",
                        height: "70px",
                      }}>
                      {order?.name}
                    </div>
                  </WrapperNameProduct>
                  <WrapperItem>{convertPrice(order?.price)}</WrapperItem>
                  <WrapperItem>{order?.amount}</WrapperItem>
                  <WrapperItem>
                    {order?.discount
                      ? convertPrice((priceMemo * order?.discount) / 100)
                      : "0 $"}
                  </WrapperItem>
                </WrapperProduct>
              );
            })}

            <WrapperAllPrice>
              <WrapperItemLabel>Temporary Price :</WrapperItemLabel>
              <WrapperItem>{convertPrice(priceMemo)}</WrapperItem>
            </WrapperAllPrice>
            <WrapperAllPrice>
              <WrapperItemLabel>Delivery charges : </WrapperItemLabel>
              <WrapperItem>{convertPrice(data?.shippingPrice)}</WrapperItem>
            </WrapperAllPrice>
            <WrapperAllPrice>
              <WrapperItemLabel>Total Price :</WrapperItemLabel>
              <WrapperItem>
                <WrapperItem>{convertPrice(data?.totalPrice)}</WrapperItem>
              </WrapperItem>
            </WrapperAllPrice>
          </WrapperStyleContent>
        </div>
      </div>
    </Loading>
  );
};

export default DetailsOrderPage;
