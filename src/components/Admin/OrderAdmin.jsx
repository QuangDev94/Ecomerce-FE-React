import React from "react";
import TableComponent from "../Table/TableComponent";
import * as OrderService from "../../services/OrderService";

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { WrapperHeaderUser } from "./style";
import { useQuery } from "@tanstack/react-query";
import { convertPrice } from "../../utils";
import ChartComponent from "../Chart/ChartComponent";
const renderAction = () => {
  return (
    <div>
      <DeleteOutlined
        style={{
          color: "red",
          padding: "5px",
          cursor: "pointer",
          marginRight: "3px",
          fontSize: "18px",
        }}
      />
      <EditOutlined
        style={{
          color: "green",
          padding: "5px",
          cursor: "pointer",
          marginLeft: "3px",
          fontSize: "18px",
        }}
      />
    </div>
  );
};
const columns = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
  {
    title: "TotalPrice",
    dataIndex: "totalPrice",
  },
  {
    title: "IsPaid",
    dataIndex: "isPaid",
  },
  {
    title: "Action",
    dataIndex: "action",
    render: renderAction,
  },
];
const OrderAdmin = () => {
  // Get all user
  const fetchAllOrder = async () => {
    let access_token = localStorage.getItem("access_token");
    access_token = JSON.parse(access_token);
    const res = await OrderService.getOrderAll(access_token);
    return res;
  };

  const {
    isLoading: isLoadingFetchOrder,
    data: allOder,
    refetch,
  } = useQuery({
    queryKey: ["allOrder"],
    queryFn: fetchAllOrder,
    retry: 3,
    retryDelay: 1000,
    refetchInterval: 0,
    refetchOnWindowFocus: true,
  });

  const dataTable =
    allOder?.data?.length &&
    allOder?.data?.map((order) => {
      return {
        name: order.shippingAddress.fullName,
        address: order.shippingAddress.address,
        totalPrice: convertPrice(order.totalPrice),
        key: order._id,
        isPaid: order.isPaid.toString(),
      };
    });
  // End Get all user
  return (
    <div>
      <WrapperHeaderUser>Order Manager</WrapperHeaderUser>
      {/* <div style={{ width: 200, height: 200 }}>
        <ChartComponent />
      </div> */}
      <TableComponent
        data={dataTable}
        columns={columns}
        isLoading={isLoadingFetchOrder}
        // onRow={(record, rowIndex) => {
        //   return {
        //     onClick: async (event) => {
        //       if (
        //         event.target.parentElement.classList["value"] ===
        //           "anticon anticon-edit" ||
        //         event.target.parentElement.classList["value"] ===
        //           "anticon anticon-edit" ||
        //         event.target.parentElement.getAttribute("data-icon") === "edit"
        //       ) {
        //         setIsLoadingUpdate(true);
        //         setIsOpenDrawer(true);
        //         let access_token = localStorage.getItem("access_token");
        //         access_token = JSON.parse(access_token);
        //         const res = await UserService.getDetailsUser(
        //           record._id,
        //           access_token,
        //         );
        //         setStateUserDetails({
        //           id: res?.data?._id,
        //           name: res?.data?.name,
        //           email: res?.data?.email,
        //           address: res?.data?.address,
        //           city: res?.data?.city,
        //           phone: res?.data?.phone,
        //           password: res?.data?.password,
        //           admin: res?.data?.isAdmin,
        //           avatar: res?.data?.avatar,
        //         });
        //       }
        //       if (
        //         event.target.parentElement.classList["value"] ===
        //           "anticon anticon-delete" ||
        //         event.target.parentElement.classList["value"] ===
        //           "anticon anticon-delete" ||
        //         event.target.parentElement.getAttribute("data-icon") ===
        //           "delete"
        //       ) {
        //         setIdDeleteProduct(record._id);
        //         setIsModalDeleteOpen(true);
        //       }
        //     },
        //   };
        // }}
      />
    </div>
  );
};

export default OrderAdmin;
