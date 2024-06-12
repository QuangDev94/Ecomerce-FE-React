import React from "react";
import { Badge, Col } from "antd";
import {
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
import { useSelector } from 'react-redux';

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  console.log(user)
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
          <WrapperHeaderAcount onClick={() => {navigate('/sign-in')}}>
            <UserOutlined style={{ fontSize: "25px" }} />
            {user?.name ? (
              <div>{user?.name}</div>
            ) : (
              <div>
                <span style={{ fontSize: "12px",whiteSpace: "nowrap" }}>Đăng nhập/Đăng ký</span>
                <div>
                  <span>Tài khoản</span>
                  <CaretDownOutlined />
                </div>
              </div>
            )}
          </WrapperHeaderAcount>
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
