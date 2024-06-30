import React, { useState } from "react";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  UserOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { renderPage } from "../../utils";
import Header from "../../components/Header/Header";

const items = [
  {
    key: "user",
    icon: <UserOutlined />,
    label: "User",
  },
  {
    key: "product",
    icon: <AppstoreOutlined />,
    label: "Product",
  },
  {
    key: "order",
    icon: <UnorderedListOutlined />,
    label: "Order",
  },
];

const AdminPage = () => {
  const [pageSelected, setPageSelected] = useState("user");

  const handelOnClick = ({ key }) => {
    setPageSelected(key);
  };
  return (
    <>
      <Header isHiddenSearch isHiddenCart />
      <div style={{ display: "flex" }}>
        <Menu
          mode="inline"
          style={{
            width: 256,
            height: "100vh",
          }}
          items={items}
          onClick={handelOnClick}
        />
        <div style={{ flex: 1, padding: "15px" }}>
          {renderPage(pageSelected)}
        </div>
      </div>
    </>
  );
};

export default AdminPage;
