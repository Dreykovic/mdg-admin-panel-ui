import { createSlice } from '@reduxjs/toolkit';

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState: {
    isMinified: false,
    isOpened: false,
  },
  reducers: {
    minifySidebar: (state) => {
      state.isMinified = true;
      state.isOpened = false;
    },

    maximizeSidebar: (state) => {
      state.isMinified = false;
      state.isOpened = false;
    },

    closeSidebar: (state) => {
      state.isOpened = false;
      state.isMinified = false;
    },
    openSidebar: (state) => {
      state.isOpened = true;
      state.isMinified = false;
    },
  },
});

export const { minifySidebar, maximizeSidebar, openSidebar, closeSidebar } =
  sidebarSlice.actions;

export default sidebarSlice.reducer;
