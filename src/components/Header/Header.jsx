import React, { useState } from "react";
import { Col, Popover } from "antd";
import {
  WrapperContentPopover,
  WrapperHeader,
  WrapperHeaderAcount,
  WrapperHeaderCart,
  WrapperHeaderText,
  WrapperSearch,
  WrraperBagde,
  WrraperColAccount,
} from "./style";
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../services/UserService";
import { resetUser } from "../../redux/slices/userSlice";
import Loading from "../Loading/Loading";
import { searchProduct } from "../../redux/slices/productSlice";
import { useViewport } from "../../hooks/useViewport";

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
            isHiddenSearch && isHiddenCart ? "space-between" : "space-around",
        }}>
        <Col
          span={4}
          onClick={
            viewPort.width < 650
              ? () => navigate("/sign-in")
              : () => navigate("/")
          }>
          <WrapperHeaderText>QuangDev</WrapperHeaderText>
        </Col>
        {!isHiddenSearch && (
          <Col span={12}>
            <WrapperSearch
              placeholder="input search text"
              enterButton
              onSearch={handleSearch}
            />
          </Col>
        )}
        <Col
          span={7}
          style={{
            display: `${viewPort.width < 650 ? "none" : "flex"}`,
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
