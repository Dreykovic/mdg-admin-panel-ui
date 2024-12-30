import { configureStore } from '@reduxjs/toolkit';

import sidebarReducer from '@/components/sidebar/sidebar-slice';
import env from '@/config/env';

import alertReducer from '../components/ui/alerts/alert-slice';

import apiSlice from './api-slice';
import authReducer from '@/features/auth/store/slice';
import pageReducer from './page-slice';
import themeReducer from './theme-slice';

const combinedReducer = {
  auth: authReducer,
  theme: themeReducer,
  page: pageReducer,
  sidebar: sidebarReducer,
  alert: alertReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
};

const store = configureStore({
  reducer: combinedReducer,
  devTools: env.appState !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
