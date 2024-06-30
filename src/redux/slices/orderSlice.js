import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderItems: [],
  shippingAddress: {},
  paymentMethod: "",
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
  user: "",
  isPaid: false,
  paidAt: "",
  isDelivered: false,
  deliveredAt: "",
  isOrderSuccess: false,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrderProduct: (state, action) => {
      const { orderItem } = action.payload;
      const itemOrder = state?.orderItems?.find(
        (item) => item?.product === orderItem?.product,
      );
      if (itemOrder) {
        itemOrder.amount += orderItem?.amount;
        state.isOrderSuccess = true;
      } else {
        state.orderItems.push(orderItem);
        state.isOrderSuccess = true;
      }
    },
    resetAddOrder: (state, action) => {
      state.isOrderSuccess = false;
    },
    changeAmountProduct: (state, action) => {
      const { value, productId } = action.payload;
      const itemOrder = state?.orderItems?.find(
        (item) => item?.product === productId,
      );
      itemOrder.amount = value;
    },
    deleteOrderProduct: (state, action) => {
      const { productId } = action.payload;
      const itemOrders = state?.orderItems?.filter(
        (item) => item?.product !== productId,
      );
      state.orderItems = itemOrders;
    },
    deleteAllOrderProduct: (state, action) => {
      const { listChecked } = action.payload;
      const itemOrders = state?.orderItems?.filter(
        (item) => !listChecked.includes(item?.product),
      );
      state.orderItems = itemOrders;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addOrderProduct,
  changeAmountProduct,
  deleteOrderProduct,
  deleteAllOrderProduct,
  resetAddOrder,
} = orderSlice.actions;

export default orderSlice.reducer;
