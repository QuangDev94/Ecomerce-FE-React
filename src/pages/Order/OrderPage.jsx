import { Form, Input, InputNumber, Modal } from "antd";
import React, { useEffect, useState } from "react";
import {
  CustomCheckbox,
  WrapperInfo,
  WrapperItemOrder,
  WrapperLeft,
  WrapperListOrder,
  WrapperRight,
  WrapperStyleHeader,
  WrapperStyleHeaderDelivery,
  WrapperStyleHeaderDilivery,
  WrapperTotal,
} from "./style";
import { DeleteOutlined } from "@ant-design/icons";

import ButtonComponent from "../../components/Button/ButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as UserService from "../../services/UserService";
import Loading from "../../components/Loading/Loading";
import * as message from "../../components/Message/Message";
import { updateUser } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import {
  changeAmountProduct,
  deleteAllOrderProduct,
  deleteOrderProduct,
} from "../../redux/slices/orderSlice";
import { convertPrice } from "../../utils";
import StepComponent from "../../components/Step/StepComponent";

const OrderPage = () => {
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const [listChecked, setListChecked] = useState([]);
  const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false);
  const [stateUserDetails, setStateUserDetails] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
  });
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const handleChangeQuantity = (value, productId) => {
    dispatch(changeAmountProduct({ value, productId }));
  };

  const handleDeleteOrder = (productId) => {
    dispatch(deleteOrderProduct({ productId }));
  };
  const onChangeAll = (e) => {
    if (listChecked.includes(e.target.value)) {
      const newListChecked = listChecked.filter(
        (item) => item !== e.target.value,
      );
      setListChecked(newListChecked);
    } else {
      setListChecked([...listChecked, e.target.value]);
    }
  };

  const handleOnchangeCheckAll = (e) => {
    if (e.target.checked) {
      const newListChecked = [];
      order?.orderItems?.forEach((item) => {
        newListChecked.push(item?.product);
      });
      setListChecked(newListChecked);
    } else {
      setListChecked([]);
    }
  };

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

  const handleAddressClick = () => {
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

  const handleRemoveAllOrder = () => {
    if (listChecked?.length >= 1) {
      dispatch(deleteAllOrderProduct({ listChecked }));
    }
  };

  const handleBuyClick = () => {
    if (!order?.orderItems?.length) {
      message.error("Please choice product! ");
    } else if (!user?.phone || !user.address || !user.name || !user.city) {
      setIsOpenModalUpdateInfo(true);
    } else {
      navigate("/payment");
    }
  };

  const mutationUpdate = useMutationHooks((data) => {
    const { id, token, ...rests } = data;
    const res = UserService.updateUser(id, { ...rests }, token);
    return res;
  });

  const { isPending, data } = mutationUpdate;

  const handleCancelUpdate = () => {
    setStateUserDetails({
      name: "",
      email: "",
      phone: "",
      address: "",
    });
    form.resetFields();
    setIsOpenModalUpdateInfo(false);
  };
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

  const handleOnchangeDetails = (e) => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value,
    });
  };
  const itemsDelivery = [
    {
      title: "200 $",
      description: "Under 2.000 $",
    },
    {
      title: "100 VND",
      description: "From 2.000 $ To 5.000 $",
    },
    {
      title: "Free ship",
      description: "Over 5.000 $",
    },
  ];
  return (
    <div
      style={{
        background: "#f5f5fa",
        with: "100%",
        height: "100vh",
        padding: "0 120px",
      }}>
      <div
        style={{
          height: "100%",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
        }}>
        <h3
          style={{
            fontWeight: "bold",
            paddingTop: "20px",
            marginTop: 0,
            fontSize: "14px",
          }}>
          Cart Order
        </h3>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: "20px",
          }}>
          <WrapperLeft>
            <WrapperStyleHeaderDelivery>
              <StepComponent
                items={itemsDelivery}
                current={
                  deliveryPriceMemo === 100
                    ? 2
                    : deliveryPriceMemo === 200
                    ? 1
                    : order.orderItems.length === 0
                    ? 0
                    : 3
                }
              />
            </WrapperStyleHeaderDelivery>
            <WrapperStyleHeader>
              <span style={{ display: "inline-block", width: "390px" }}>
                <CustomCheckbox
                  onChange={handleOnchangeCheckAll}
                  checked={
                    listChecked?.length === order?.orderItems?.length
                  }></CustomCheckbox>
                <span> All ({order?.orderItems?.length} product)</span>
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
                <DeleteOutlined
                  style={{ cursor: "pointer" }}
                  onClick={handleRemoveAllOrder}
                />
              </div>
            </WrapperStyleHeader>
            <WrapperListOrder>
              {order?.orderItems?.map((order) => {
                return (
                  <WrapperItemOrder key={order?.product}>
                    <div
                      style={{
                        width: "390px",
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                      }}>
                      <CustomCheckbox
                        onChange={onChangeAll}
                        value={order?.product}
                        checked={listChecked.includes(
                          order?.product,
                        )}></CustomCheckbox>
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
                      <InputNumber
                        min={1}
                        max={10}
                        defaultValue={order?.amount}
                        onChange={(value) =>
                          handleChangeQuantity(value, order?.product)
                        }
                      />
                      <span
                        style={{
                          color: "rgb(255, 66, 78)",
                          fontSize: "13px",
                          fontWeight: 500,
                        }}>
                        {convertPrice(order?.price * order?.amount)}
                      </span>
                      <DeleteOutlined
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDeleteOrder(order?.product)}
                      />
                    </div>
                  </WrapperItemOrder>
                );
              })}
            </WrapperListOrder>
          </WrapperLeft>
          <WrapperRight>
            <div style={{ width: "100%" }}>
              <WrapperInfo>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Shipping Address: </span>
                  <span style={{ fontWeight: "bold" }}>
                    {`${user?.address}, ${user?.city}`}
                  </span>
                  <span
                    onClick={handleAddressClick}
                    style={{ color: "rgb(26, 148, 255)", cursor: "pointer" }}>
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
                  }}></div>
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
            <ButtonComponent
              onClick={() => handleBuyClick()}
              size={40}
              styleButton={{
                background: "rgb(255, 57, 69)",
                height: "48px",
                width: "320px",
                border: "none",
                borderRadius: "4px",
              }}
              textButton="Buy Now"
              styleTextButton={{
                color: "#fff",
                fontSize: "15px",
                fontWeight: "700",
              }}
            />
          </WrapperRight>
        </div>
      </div>
      <Modal
        title="Update a order information"
        open={isOpenModalUpdateInfo}
        onCancel={handleCancelUpdate}
        onOk={handleUpdateInforUser}>
        <Loading spinning={isPending}>
          <Form
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            autoComplete="on"
            form={form}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}>
              <Input
                value={stateUserDetails["name"]}
                onChange={handleOnchangeDetails}
                name="name"
              />
            </Form.Item>
            <Form.Item
              label="City"
              name="city"
              rules={[{ required: true, message: "Please input your city!" }]}>
              <Input
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
              <Input
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
              <Input
                value={stateUserDetails.address}
                onChange={handleOnchangeDetails}
                name="address"
              />
            </Form.Item>
          </Form>
        </Loading>
      </Modal>
    </div>
  );
};

export default OrderPage;
