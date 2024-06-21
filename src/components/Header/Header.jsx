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
import { searchProduct } from "../../redux/slices/productSlice";

const Header = ({isHiddenSearch, isHiddenCart}) => {
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const LogOutHandle = async () => {
    setLoading(true);
    await UserService.logOut();
    dispatch(resetUser());
    navigate('/');
    setLoading(false);
  };

  const handleSearch = (value, _e, info) => {
    dispatch(searchProduct(value));
  };

  const content = (
    <div>
      <WrapperContentPopover onClick={() => navigate('/profile-user')}>User Information</WrapperContentPopover>
      {
        user?.isAdmin ? (
          <WrapperContentPopover onClick={() => navigate('/system/admin')}>System Admin</WrapperContentPopover>
        ) : (
          <></>
        )
      }
      <WrapperContentPopover onClick={LogOutHandle}>Log out</WrapperContentPopover>
    </div>
  );
  return (
    <div>
      <WrapperHeader style={{justifyContent: isHiddenSearch && isHiddenCart ? 'space-between' : 'space-around'}}>
        <Col span={4} onClick={() => navigate('/')}>
          <WrapperHeaderText>QuangDev</WrapperHeaderText>
        </Col>
        {
          !isHiddenSearch && (
            <Col span={12}>
              <Search 
                placeholder="input search text" 
                enterButton
                onSearch={handleSearch}
              />
            </Col>
          )
        }
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
              {
                user?.avatar ? (
                <Popover placement="bottom" content={content} trigger="click">
                  <img src={user?.avatar} style={{
                    height: '40px',
                    width: '40px',
                    borderRadius: '50%',
                    objectFit: 'cover' }}/>
                </Popover>

                ) : (
                  <UserOutlined style={{ fontSize: "25px" }} />
                )
              }
              {user?.email ? (
                <Popover placement="bottom" content={content} trigger="click">
                  <div>{user?.name || user?.email}</div>
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
          {
            !isHiddenCart && (
              <WrapperHeaderCart>
                <Badge count={4} size="small">
                  <ShoppingCartOutlined style={{ fontSize: "25px",color: '#fff' }} />
                </Badge>
                <span style={{ fontSize: "12px",whiteSpace: "nowrap" }}>Giỏ hàng</span>
              </WrapperHeaderCart>
            )
          }
        </Col>
      </WrapperHeader>
    </div>
  );
};

export default Header;
