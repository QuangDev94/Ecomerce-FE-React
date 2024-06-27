import React from "react";
import { useSelector } from "react-redux";
import * as OrderService from "../../services/OrderService";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading/Loading";

const MyOrderPage = () => {
  const user = useSelector((state) => state?.user);
  const fetchMyOrder = async () => {
    const res = await OrderService.getOrderByUserId(
      user?.id,
      user?.access_token,
    );
    return res.data;
  };
  const queryOrder = useQuery(
    { queryKey: ["Orders"], queryFn: fetchMyOrder },
    {
      enabled: user?.id && user?.access_token,
    },
  );
  const { isLoading, data } = queryOrder;
  console.log(data);
  return (
    <Loading spinning={isLoading}>
      <div>MyOrderPage</div>
    </Loading>
  );
};

export default MyOrderPage;
