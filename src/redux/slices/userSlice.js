import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  name: "",
  email: "",
  phone: "",
  address: "",
  avatar: "",
  access_token: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const {
        _id = "",
        name = "",
        email = "",
        phone = "",
        address = "",
        avatar = "",
        access_token,
      } = action.payload;
      state.id = _id;
      state.email = email;
      state.name = name;
      state.phone = phone;
      state.address = address;
      state.avatar = avatar;
      state.access_token = access_token;
    },
    resetUser: (state) => {
      state.id = "";
      state.email = "";
      state.name = "";
      state.phone = "";
      state.address = "";
      state.avatar = "";
      state.access_token = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
