import React, { useState } from "react";
import { Badge, Col, Popover  } from "antd";
import {
  WrapperContentPopover,
  WrapperHeader,
  WrapperHeaderAcount,
  WrapperHeaderCart,
  WrapperHeaderText,
} from "./style";
import Search from "antd/es/input/Search";
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import * as UserService from '../../services/UserService';
import { resetUser } from "../../redux/slices/userSlice";
import Loading from "../Loading/Loading";

const Header = () => {
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const LogOutHandle = async () => {
    setLoading(true);
    await UserService.logOut();
    dispatch(resetUser());
    setLoading(false);
  }
  const content = (
    <div>
      <WrapperContentPopover onClick={LogOutHandle}>Log out</WrapperContentPopover>
      <WrapperContentPopover>User Information</WrapperContentPopover>
    </div>
  );
  return (
    <div>
      <WrapperHeader>
        <Col span={4}>
          <WrapperHeaderText>QuangDev</WrapperHeaderText>
        </Col>
        <Col span={12}>
          <Search placeholder="input search text" enterButton />
        </Col>
        <Col
          span={7}
          style={{
            display: "flex",
            alignItems: "center",
            // gap: "7px",
            justifyContent: "right",
          }}
        >
          <Loading spinning={loading}>
            <WrapperHeaderAcount>
              <UserOutlined style={{ fontSize: "25px" }} />
              {user?.name ? (
                <Popover placement="bottom" content={content} trigger="click">
                  <div>{user?.name}</div>
                </Popover>
              ) : (
                <div onClick={() => {navigate('/sign-in')}}>
                  <span style={{ fontSize: "12px",whiteSpace: "nowrap" }}>Đăng nhập/Đăng ký</span>
                  <div>
                    <span>Tài khoản</span>
                    <CaretDownOutlined />
                  </div>
                </div>
              )}
            </WrapperHeaderAcount>
          </Loading>
          <WrapperHeaderCart>
            <Badge count={4} size="small">
              <ShoppingCartOutlined style={{ fontSize: "25px",color: '#fff' }} />
            </Badge>
            <span style={{ fontSize: "12px",whiteSpace: "nowrap" }}>Giỏ hàng</span>
          </WrapperHeaderCart>
        </Col>
      </WrapperHeader>
    </div>
  );
};

export default Header;
