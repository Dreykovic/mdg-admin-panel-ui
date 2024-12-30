import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import authUtil from '@/utils/auth-utils';
import { User } from '@/types/entity';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  authUser: Partial<User> | null;
}
interface AuthPayload {
  user: Partial<User>;
  tokens: { accessToken: string | null; refreshToken: string | null };
}
const initialState: AuthState = {
  isAuthenticated: authUtil.isAuthenticated(),
  // isAuthenticated: authUtil.isAuthenticated(),
  authUser: authUtil.getUserData(),
  accessToken: authUtil.getAccessToken(),
  refreshToken: authUtil.getRefreshToken(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    makeGlobalLogin: (state, action: PayloadAction<AuthPayload>) => {
      authUtil.updateAccessToken(action.payload.tokens.accessToken || '');
      authUtil.updateRefreshToken(action.payload.tokens.refreshToken || '');
      authUtil.setUserData(action.payload.user);
      state.accessToken = action.payload.tokens.accessToken;
      state.refreshToken = action.payload.tokens.refreshToken;
      state.authUser = action.payload.user;
      state.isAuthenticated = true;
      // window.location.href = '/';
    },
    makeGlobalLogout: (state) => {
      authUtil.clearAccessToken();
      authUtil.clearRefreshToken();
      authUtil.clearUserData();
      localStorage.clear();
      state.accessToken = null;
      state.refreshToken = null;
      state.authUser = null;
      state.isAuthenticated = false;
      window.location.href = '/';
    },
  },
});

export const { makeGlobalLogin, makeGlobalLogout } = authSlice.actions;

export default authSlice.reducer;
