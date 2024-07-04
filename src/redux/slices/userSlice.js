import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  avatar: "",
  isAdmin: false,
  access_token: "",
  refresh_token: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const {
        _id = "",
        id = "",
        name = "",
        email = "",
        phone = "",
        address = "",
        city = "",
        avatar = "",
        isAdmin,
        access_token,
        refresh_token,
      } = action.payload;
      state.id = _id || id;
      state.email = email;
      state.name = name;
      state.phone = phone;
      state.address = address;
      state.city = city;
      state.avatar = avatar;
      state.isAdmin = isAdmin;
      state.access_token = access_token;
      state.refresh_token = refresh_token;
    },
    resetUser: (state) => {
      state.id = "";
      state.email = "";
      state.name = "";
      state.phone = "";
      state.address = "";
      state.city = "";
      state.avatar = "";
      state.isAdmin = false;
      state.access_token = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
