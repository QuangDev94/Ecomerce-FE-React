import axios from "axios";

export const createOrder = async (access_token, data) => {
  console.log(access_token);
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
