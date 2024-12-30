import { createSlice, PayloadAction } from '@reduxjs/toolkit';
const currentTheme = localStorage.getItem('theme');
type ThemePayload = {
  theme: string;
};
export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    currentTheme: currentTheme ?? 'dark',
  },
  reducers: {
    setTheme: (state, action: PayloadAction<ThemePayload>) => {
      state.currentTheme = action.payload.theme;
      document.documentElement.setAttribute('data-theme', action.payload.theme);

      localStorage.setItem('theme', action.payload.theme);
    },
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
