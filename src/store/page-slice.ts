import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IPageState {
  name?: string;
  group?: string;
}

const initialState: IPageState = {
  name: 'home',
  group: 'home',
};

const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setPageName: (state, action: PayloadAction<IPageState>) => {
      state.name = action.payload.name;
      state.group = action.payload.group;
    },
    resetPageState: (state) => {
      state.name = initialState.name;
      state.group = initialState.group;
    },
  },
});

export const { setPageName, resetPageState } = pageSlice.actions;

export default pageSlice.reducer;
