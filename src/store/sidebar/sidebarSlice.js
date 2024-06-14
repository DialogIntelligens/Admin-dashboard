// src/features/sidebar/sidebarSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebarShow: true,
  theme: 'light',
};

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    set: (state, action) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { set } = sidebarSlice.actions;
export default sidebarSlice.reducer;
