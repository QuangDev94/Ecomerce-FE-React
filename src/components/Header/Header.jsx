import React, { useState } from "react";
import { Button, Col, Popover } from "antd";
import {
  WrapperContentPopover,
  WrapperHeader,
  WrapperHeaderAcount,
  WrapperHeaderCart,
  WrapperHeaderText,
  WrapperSearch,
  WrraperBagde,
} from "./style";
import {
  UserOutlined,
  ShoppingCartOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../services/UserService";
import { resetUser } from "../../redux/slices/userSlice";
import Loading from "../Loading/Loading";
import { searchProduct } from "../../redux/slices/productSlice";
import { useViewport } from "../../hooks/useViewport";
import { resetOrder } from "../../redux/slices/orderSlice";

const Header = ({ isHiddenSearch, isHiddenCart }) => {
  const viewPort = useViewport();
  const [loading, setLoading] = useState(false);
  const [isOpenPopup, setIsOpenPopup] = useState();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const order = useSelector((state) => state.order);
  const dispatch = useDispatch();

  const LogOutHandle = async () => {
    setLoading(true);
    await UserService.logOut();
    dispatch(resetUser());
    dispatch(resetOrder());
    navigate("/");
    setLoading(false);
  };

  const handleSearch = (value, _e, info) => {
    dispatch(searchProduct(value));
  };

  const content = (
    <div>
      <WrapperContentPopover
        onClick={() => handleContentPopupClick("/profile-user")}>
        User Information
      </WrapperContentPopover>
      <WrapperContentPopover
        onClick={() => handleContentPopupClick("/my-order")}>
        My Order
      </WrapperContentPopover>
      {user?.isAdmin ? (
        <WrapperContentPopover
          onClick={() => handleContentPopupClick("/system/admin")}>
          System Admin
        </WrapperContentPopover>
      ) : (
        <></>
      )}
      <WrapperContentPopover onClick={LogOutHandle}>
        Log out
      </WrapperContentPopover>
    </div>
  );
  const content2 = (
    <Col
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        gap: "10px",
        width: "fit-content",
      }}>
      <Loading spinning={loading}>
        <WrapperHeaderAcount style={{ color: "#000" }}>
          {user?.avatar ? (
            <img
              src={user?.avatar}
              style={{
                height: "40px",
                width: "40px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          ) : (
            <UserOutlined style={{ fontSize: "20px" }} />
          )}
          {user?.email ? (
            <Popover
              placement="bottom"
              content={content}
              trigger="click"
              open={isOpenPopup}>
              <div onClick={() => setIsOpenPopup((prev) => !prev)}>
                {user?.name || user?.email}
              </div>
            </Popover>
          ) : (
            <div
              onClick={() => {
                navigate("/sign-in");
              }}>
              <span
                style={{
                  fontSize: "12px",
                  whiteSpace: "nowrap",
                  fontWeight: "bold",
                }}>
                Sign-in
              </span>
              {/* <div>
                    <span>Account</span>
                    <CaretDownOutlined />
                  </div> */}
            </div>
          )}
        </WrapperHeaderAcount>
      </Loading>
      {!isHiddenCart && (
        <WrapperHeaderCart onClick={() => navigate("/order")}>
          <WrraperBagde count={order?.orderItems?.length} size="small">
            <ShoppingCartOutlined style={{ fontSize: "20px", color: "#000" }} />
          </WrraperBagde>
          <span
            style={{ fontSize: "12px", whiteSpace: "nowrap", color: "#000" }}>
            Cart Order
          </span>
        </WrapperHeaderCart>
      )}
    </Col>
  );
  const handleContentPopupClick = (type) => {
    navigate(type, {
      state: {
        id: user?.id,
        access_token: user?.access_token,
      },
    });
    setIsOpenPopup(false);
  };
  return (
    <div>
      <WrapperHeader
        style={{
          justifyContent:
            isHiddenSearch && isHiddenCart ? "space-between" : "space-between",
        }}>
        <Col span={4} onClick={() => navigate("/")}>
          <WrapperHeaderText>QuangDev</WrapperHeaderText>
        </Col>
        {!isHiddenSearch && (
          <Col span={viewPort.width < 700 ? 11 : 12}>
            <WrapperSearch
              placeholder="input search text"
              enterButton
              onSearch={handleSearch}
            />
          </Col>
        )}
        <Col span={viewPort.width < 700 ? 1 : 0}>
          <Popover content={content2} trigger="click" placement="bottomRight">
            <CaretDownOutlined style={{ color: "#fff" }} />
          </Popover>
        </Col>
        <Col
          span={7}
          style={{
            display: `${viewPort.width < 700 ? "none" : "flex"}`,
            alignItems: "center",
            justifyContent: "right",
            width: "fit-content",
          }}>
          <Loading spinning={loading}>
            <WrapperHeaderAcount>
              {user?.avatar ? (
                <img
                  src={user?.avatar}
                  style={{
                    height: "40px",
                    width: "40px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <UserOutlined style={{ fontSize: "25px" }} />
              )}
              {user?.email ? (
                <Popover
                  placement="bottom"
                  content={content}
                  trigger="click"
                  open={isOpenPopup}>
                  <div onClick={() => setIsOpenPopup((prev) => !prev)}>
                    {user?.name || user?.email}
                  </div>
                </Popover>
              ) : (
                <div
                  onClick={() => {
                    navigate("/sign-in");
                  }}>
                  <span
                    style={{
                      fontSize: "12px",
                      whiteSpace: "nowrap",
                      fontWeight: "bold",
                    }}>
                    Sign-in
                  </span>
                  {/* <div>
                    <span>Account</span>
                    <CaretDownOutlined />
                  </div> */}
                </div>
              )}
            </WrapperHeaderAcount>
          </Loading>
          {!isHiddenCart && (
            <WrapperHeaderCart onClick={() => navigate("/order")}>
              <WrraperBagde count={order?.orderItems?.length} size="small">
                <ShoppingCartOutlined
                  style={{ fontSize: "25px", color: "#fff" }}
                />
              </WrraperBagde>
              <span style={{ fontSize: "12px", whiteSpace: "nowrap" }}>
                Cart Order
              </span>
            </WrapperHeaderCart>
          )}
        </Col>
      </WrapperHeader>
    </div>
  );
};

export default Header;
