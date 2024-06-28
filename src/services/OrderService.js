import axios from "axios";

export const createOrder = async (access_token, data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/order/create`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    },
  );

  return res.data;
};

export const getMyOrderAllByUserId = async (id, access_token) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/order/get-my-order-all/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    },
  );

  return res.data;
};

export const getDetailsOrder = async (id, access_token) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/order/get-my-order-details/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    },
  );

  return res.data;
};

export const cancelOrder = async (id, access_token, orderItems, userId) => {
  const data = { orderItems, userId };
  const res = await axios.delete(
    `${process.env.REACT_APP_API_URL}/order/cancel-order/${orderId}`,
    { data },
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    },
  );
  return res.data;
};
