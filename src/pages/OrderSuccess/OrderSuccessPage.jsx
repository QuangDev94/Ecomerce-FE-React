import { InputNumber } from "antd";
import {
  Lable,
  WrapperInfo,
  WrapperContent,
  WrapperValue,
  WrapperItemOrder,
  WrapperStyleHeader,
} from "./style";

import { useSelector } from "react-redux";
import Loading from "../../components/Loading/Loading";
import { useLocation } from "react-router-dom";
import { orderContant } from "../../contant";
import { convertPrice } from "../../utils";

const OrderSuccessPage = () => {
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);

  const location = useLocation();
  const { state } = location;
  console.log(state);
  return (
    <div
      style={{
        background: "#f5f5fa",
        with: "100%",
        height: "100vh",
        padding: "0 120px",
      }}>
      <Loading spinning={false}>
        <div
          style={{
            height: "100%",
            margin: "0 auto",
            flexDirection: "column",
          }}>
          <h3
            style={{
              fontWeight: "bold",
              paddingTop: "20px",
              marginTop: 0,
              fontSize: "14px",
            }}>
            Success Order
          </h3>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingTop: "20px",
            }}>
            <WrapperContent>
              <WrapperInfo>
                <div>
                  <Lable>Delivery methods</Lable>
                  <WrapperValue>
                    <span style={{ color: "#ea8500", fontWeight: "bold" }}>
                      {orderContant.dellivery[state?.delivery]}
                    </span>{" "}
                    Delivery of savings
                  </WrapperValue>
                </div>
              </WrapperInfo>
              <WrapperInfo>
                <div>
                  <Lable>Payment methods</Lable>
                  <WrapperValue>
                    {orderContant.payment[state?.payment]}
                  </WrapperValue>
                </div>
              </WrapperInfo>
              <WrapperStyleHeader>
                <span style={{ display: "inline-block", width: "390px" }}>
                  <span> All ({state?.orders?.length} product)</span>
                </span>
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}>
                  <span>Unit price</span>
                  <span>Quantity</span>
                  <span>Into money</span>
                </div>
              </WrapperStyleHeader>
              <WrapperInfo>
                {state?.orders?.map((order) => {
                  return (
                    <WrapperItemOrder key={order.product}>
                      <div
                        style={{
                          width: "390px",
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                        }}>
                        <img
                          src={order?.image}
                          style={{
                            width: "77px",
                            height: "79px",
                            objectFit: "cover",
                          }}
                        />
                        <div
                          style={{
                            width: 260,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}>
                          {order?.name}
                        </div>
                      </div>
                      <div
                        style={{
                          flex: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}>
                        <span>
                          <span style={{ fontSize: "13px", color: "#242424" }}>
                            {convertPrice(order?.price)}
                          </span>
                        </span>
                        <InputNumber value={order?.amount} disabled />
                        <span
                          style={{
                            color: "rgb(255, 66, 78)",
                            fontSize: "13px",
                            fontWeight: 500,
                          }}>
                          {convertPrice(order?.price * order?.amount)}
                        </span>
                      </div>
                    </WrapperItemOrder>
                  );
                })}
              </WrapperInfo>
              <br></br>
              <div>
                <span style={{ fontSize: "16px", color: "#000" }}>
                  Temporary Price : {convertPrice(state?.temporaryPriceMemo)}
                </span>
                <br></br>
                <span style={{ fontSize: "16px", color: "#000" }}>
                  Discount : {convertPrice(state?.discountPriceMemo)}
                </span>
                <br></br>
                <span style={{ fontSize: "16px", color: "#000" }}>
                  Delivery charges : {convertPrice(state?.deliveryPriceMemo)}
                </span>
              </div>
              <br></br>
              <div>
                <span
                  style={{
                    fontSize: "16px",
                    color: "red",
                    fontWeight: "bold",
                  }}>
                  Price Total : {convertPrice(state?.totalPriceMemo)}
                </span>
              </div>
            </WrapperContent>
          </div>
        </div>
      </Loading>
    </div>
  );
};

export default OrderSuccessPage;
