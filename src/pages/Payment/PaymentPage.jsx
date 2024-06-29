import { Form, Modal, Radio } from "antd";
import React, { useEffect, useState } from "react";
import {
  Lable,
  WrapperInfo,
  WrapperLeft,
  WrapperRadio,
  WrapperRight,
  WrapperTotal,
} from "./style";

import ButtonComponent from "../../components/Button/ButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import { convertPrice } from "../../utils";
import { useMemo } from "react";
import InputComponent from "../../components/Input/InputComponent";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as UserService from "../../services/UserService";
import * as OrderService from "../../services/OrderService";
import * as PaymentService from "../../services/PaymentService";
import Loading from "../../components/Loading/Loading";
import * as message from "../../components/Message/Message";
import { updateUser } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { deleteAllOrderProduct } from "../../redux/slices/orderSlice";
import { PayPalButton } from "react-paypal-button-v2";

const PaymentPage = () => {
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);

  const [delivery, setDelivery] = useState("fast");
  const [payment, setPayment] = useState("later_money");
  const [sdkReady, setSdkReady] = useState(false);
  const navigate = useNavigate();

  const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false);
  const [stateUserDetails, setStateUserDetails] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
  });
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  useEffect(() => {
    form.setFieldsValue(stateUserDetails);
  }, [form, stateUserDetails]);

  useEffect(() => {
    if (isOpenModalUpdateInfo) {
      setStateUserDetails({
        city: user?.city,
        name: user?.name,
        address: user?.address,
        phone: user?.phone,
      });
    }
  }, [isOpenModalUpdateInfo]);

  const handleChangeAddress = () => {
    setIsOpenModalUpdateInfo(true);
  };

  // Memo function
  const temporaryPriceMemo = useMemo(() => {
    const result = order?.orderItems?.reduce((total, cur) => {
      return total + cur.price * cur.amount;
    }, 0);
    return result;
  }, [order]);

  const discountPriceMemo = useMemo(() => {
    const result = order?.orderItems?.reduce((total, cur) => {
      const discount = cur.discount ? cur.discount : 0;
      return total + (discount * cur.price * cur.amount) / 100;
    }, 0);
    return result;
  }, [order]);

  const deliveryPriceMemo = useMemo(() => {
    if (temporaryPriceMemo >= 2000 && temporaryPriceMemo < 5000) {
      return 100;
    } else if (temporaryPriceMemo >= 5000 || order?.orderItems?.length === 0) {
      return 0;
    } else {
      return 200;
    }
  }, [temporaryPriceMemo]);

  const totalPriceMemo = useMemo(() => {
    return (
      Number(temporaryPriceMemo) -
      Number(discountPriceMemo) +
      Number(deliveryPriceMemo)
    );
  }, [temporaryPriceMemo, , deliveryPriceMemo]);

  const mutationUpdate = useMutationHooks((data) => {
    const { id, token, ...rests } = data;
    const res = UserService.updateUser(id, { ...rests }, token);
    return res;
  });

  const handleUpdateInforUser = () => {
    const { name, address, city, phone } = stateUserDetails;
    if (name && address && city && phone) {
      mutationUpdate.mutate(
        { id: user?.id, token: user?.access_token, ...stateUserDetails },
        {
          onSuccess: () => {
            dispatch(updateUser({ name, address, city, phone }));
            setIsOpenModalUpdateInfo(false);
          },
        },
      );
    }
  };

  const { isPending } = mutationUpdate;

  const mutationAddOrder = useMutationHooks((data) => {
    const { token, ...rests } = data;
    const res = OrderService.createOrder(token, { ...rests });
    return res;
  });

  const handleAddOrderClick = () => {
    if (
      user?.access_token &&
      order?.orderItems &&
      user?.name &&
      user?.address &&
      user?.phone &&
      user?.city &&
      temporaryPriceMemo &&
      user?.id
    ) {
      mutationAddOrder.mutate({
        token: user?.access_token,
        orderItems: order?.orderItems,
        fullName: user?.name,
        address: user?.address,
        phone: user?.phone,
        city: user?.city,
        paymentMethod: payment,
        itemsPrice: temporaryPriceMemo,
        shippingPrice: deliveryPriceMemo,
        totalPrice: totalPriceMemo,
        user: user?.id,
      });
    }
  };

  const {
    data: dataAdd,
    isPending: isLoadingAddOrder,
    isSuccess,
    isError,
  } = mutationAddOrder;

  useEffect(() => {
    if (isSuccess && dataAdd?.status === "OK") {
      const arrayOrdered = [];
      order?.orderItems?.forEach((element) => {
        arrayOrdered.push(element.product);
      });
      dispatch(deleteAllOrderProduct({ listChecked: arrayOrdered }));
      message.success("Create Order Success!");
      navigate("/order-success", {
        state: {
          delivery,
          payment,
          orders: order?.orderItems,
          temporaryPriceMemo,
          discountPriceMemo,
          deliveryPriceMemo,
          totalPriceMemo,
        },
      });
    }
    if (isError) {
      message.error(
        mutationAddOrder?.error?.response?.data?.message?.message,
        5,
      );
    }
  }, [isSuccess, isError]);

  const handleCancleUpdate = () => {
    setStateUserDetails({
      name: "",
      email: "",
      phone: "",
      isAdmin: false,
    });
    form.resetFields();
    setIsOpenModalUpdateInfo(false);
  };

  const handleOnchangeDetails = (e) => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value,
    });
  };
  const handleDilivery = (e) => {
    setDelivery(e.target.value);
  };

  const handlePaymentChange = (e) => {
    setPayment(e.target.value);
  };
  const onSuccessPaypal = (details, data) => {
    mutationAddOrder.mutate({
      token: user?.access_token,
      orderItems: order?.orderItems,
      fullName: user?.name,
      address: user?.address,
      phone: user?.phone,
      city: user?.city,
      paymentMethod: payment,
      itemsPrice: temporaryPriceMemo,
      shippingPrice: deliveryPriceMemo,
      totalPrice: totalPriceMemo,
      user: user?.id,
      isPaid: true,
      paidAt: details.update_time,
    });
  };
  const addPaypalScript = async () => {
    const { data } = await PaymentService.getConfig();
    console.log(data);
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };

  useEffect(() => {
    if (!window.paypal) {
      addPaypalScript();
    } else {
      setSdkReady(true);
    }
  }, []);
  return (
    <div
      style={{
        background: "#f5f5fa",
        with: "100%",
        height: "100vh",
        padding: "0 120px",
      }}>
      <Loading spinning={isLoadingAddOrder}>
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
            Payment
          </h3>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingTop: "20px",
            }}>
            <WrapperLeft>
              <WrapperInfo>
                <div>
                  <Lable>Select delivery method</Lable>
                  <WrapperRadio onChange={handleDilivery} value={delivery}>
                    <Radio value="fast">
                      <span style={{ color: "#ea8500", fontWeight: "bold" }}>
                        FAST
                      </span>{" "}
                      Shipping Save
                    </Radio>
                    <Radio value="gojek">
                      <span style={{ color: "#ea8500", fontWeight: "bold" }}>
                        GO_JEK
                      </span>{" "}
                      Shipping Save
                    </Radio>
                  </WrapperRadio>
                </div>
              </WrapperInfo>
              <WrapperInfo>
                <div>
                  <Lable>Choose payment method</Lable>
                  <WrapperRadio onChange={handlePaymentChange} value={payment}>
                    <Radio value="later_money">Pay cash upon receipt</Radio>
                    <Radio value="paypal">Pay by PayPal</Radio>
                  </WrapperRadio>
                </div>
              </WrapperInfo>
            </WrapperLeft>
            <WrapperRight>
              <div style={{ width: "100%" }}>
                <WrapperInfo>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}>
                    <span>Shipping Address: </span>
                    <span style={{ fontWeight: "bold" }}>
                      {`${user?.address} ${user?.city}`}{" "}
                    </span>
                    <span
                      onClick={handleChangeAddress}
                      style={{ color: "#9255FD", cursor: "pointer" }}>
                      Change
                    </span>
                  </div>
                </WrapperInfo>
                <WrapperInfo>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}>
                    <span>Temporary Price : </span>
                    <span
                      style={{
                        color: "#000",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}>
                      {convertPrice(temporaryPriceMemo)}
                    </span>
                  </div>
                  <br></br>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}>
                    <span>Discount : </span>
                    <span
                      style={{
                        color: "#000",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}>
                      {convertPrice(discountPriceMemo)}
                    </span>
                  </div>
                  <br></br>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}>
                    <span>Delivery charges : </span>
                    <span
                      style={{
                        color: "#000",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}>
                      {convertPrice(deliveryPriceMemo)}
                    </span>
                  </div>
                </WrapperInfo>
                <WrapperTotal>
                  <span>Total Price : </span>
                  <span style={{ display: "flex", flexDirection: "column" }}>
                    <span
                      style={{
                        color: "rgb(254, 56, 52)",
                        fontSize: "24px",
                        fontWeight: "bold",
                      }}>
                      {convertPrice(totalPriceMemo)}
                    </span>
                    <span style={{ color: "#000", fontSize: "11px" }}>
                      (VAT included if applicable)
                    </span>
                  </span>
                </WrapperTotal>
              </div>
              {payment === "paypal" && sdkReady ? (
                <div style={{ width: "320px" }}>
                  <PayPalButton
                    amount={totalPriceMemo}
                    // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                    onSuccess={onSuccessPaypal}
                    onError={() => {
                      alert("Error");
                    }}
                  />
                </div>
              ) : (
                <ButtonComponent
                  onClick={() => handleAddOrderClick()}
                  size={40}
                  styleButton={{
                    background: "rgb(255, 57, 69)",
                    height: "48px",
                    width: "320px",
                    border: "none",
                    borderRadius: "4px",
                  }}
                  textButton="Payment"
                  styleTextButton={{
                    color: "#fff",
                    fontSize: "15px",
                    fontWeight: "700",
                  }}
                />
              )}
            </WrapperRight>
          </div>
        </div>
        <Modal
          title="Cập nhật thông tin giao hàng"
          open={isOpenModalUpdateInfo}
          onCancel={handleCancleUpdate}
          onOk={handleUpdateInforUser}>
          <Loading spinning={isPending}>
            <Form
              name="basic"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 20 }}
              // onFinish={onUpdateUser}
              autoComplete="on"
              form={form}>
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  { required: true, message: "Please input your name!" },
                ]}>
                <InputComponent
                  value={stateUserDetails["name"]}
                  onChange={handleOnchangeDetails}
                  name="name"
                />
              </Form.Item>
              <Form.Item
                label="City"
                name="city"
                rules={[
                  { required: true, message: "Please input your city!" },
                ]}>
                <InputComponent
                  value={stateUserDetails["city"]}
                  onChange={handleOnchangeDetails}
                  name="city"
                />
              </Form.Item>
              <Form.Item
                label="Phone"
                name="phone"
                rules={[
                  { required: true, message: "Please input your  phone!" },
                ]}>
                <InputComponent
                  value={stateUserDetails.phone}
                  onChange={handleOnchangeDetails}
                  name="phone"
                />
              </Form.Item>

              <Form.Item
                label="Adress"
                name="address"
                rules={[
                  { required: true, message: "Please input your  address!" },
                ]}>
                <InputComponent
                  value={stateUserDetails.address}
                  onChange={handleOnchangeDetails}
                  name="address"
                />
              </Form.Item>
            </Form>
          </Loading>
        </Modal>
      </Loading>
    </div>
  );
};

export default PaymentPage;
