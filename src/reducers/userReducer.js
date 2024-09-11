// src/reducers/userReducer.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  mobile: '',
  profileImage: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.mobile = action.payload.mobile;
      state.profileImage = action.payload.profileImage;
    },
    logout: (state) => {
      return initialState;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
