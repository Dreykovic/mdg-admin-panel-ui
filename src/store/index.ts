import { configureStore } from '@reduxjs/toolkit';

import sidebarReducer from '@/components/sidebar/sidebar-slice';
import env from '@/config/env';
import authReducer from '@/features/auth/store/slice';

import alertReducer from '../components/ui/alerts/alert-slice';

import pageReducer from './page-slice';
import themeReducer from './theme-slice';
import { baseApiSlice } from './base-api-slice';

const combinedReducer = {
  auth: authReducer,
  theme: themeReducer,
  page: pageReducer,
  sidebar: sidebarReducer,
  alert: alertReducer,
  [baseApiSlice.reducerPath]: baseApiSlice.reducer,
};

const store = configureStore({
  reducer: combinedReducer,
  devTools: env.appState !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApiSlice.middleware),
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
