import { jwtDecode } from 'jwt-decode';

import { User } from '@/types/entity';
import { LOCAL_STORAGE_KEYS } from './global-constant-util';

const authUtil = (() => {
  // Vérification de la disponibilité de Storage
  const isStorageAvailable = (): boolean => typeof Storage !== 'undefined';

  // Gestion générique de localStorage
  const getFromStorage = <T>(key: string): T | null => {
    if (!isStorageAvailable()) return null;
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  };

  const setToStorage = (key: string, value: unknown): void => {
    if (!isStorageAvailable()) return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(
        `Failed to set ${key} in localStorage: ${(error as Error).message}`,
      );
    }
  };

  const removeFromStorage = (key: string): void => {
    if (isStorageAvailable()) {
      localStorage.removeItem(key);
    }
  };

  return {
    getUserData: (): Partial<User> | null =>
      getFromStorage<Partial<User>>(LOCAL_STORAGE_KEYS.USER_INFO_KEY),

    setUserData: (user: Partial<User>): void => {
      if (user && typeof user === 'object' && Object.keys(user).length > 0) {
        setToStorage(LOCAL_STORAGE_KEYS.USER_INFO_KEY, user);
      } else {
        console.error('Invalid user data provided.');
      }
    },

    clearUserData: (): void =>
      removeFromStorage(LOCAL_STORAGE_KEYS.USER_INFO_KEY),

    getAccessToken: (): string | null => {
      const token = getFromStorage<string>(
        LOCAL_STORAGE_KEYS.AUTH_ACCESS_TOKEN_KEY,
      );
      const cleanToken = token ? token.replace(/^"|"$/g, '') : null;

      return cleanToken;
    },

    updateAccessToken: (token: string): void =>
      setToStorage(LOCAL_STORAGE_KEYS.AUTH_ACCESS_TOKEN_KEY, token),

    clearAccessToken: (): void =>
      removeFromStorage(LOCAL_STORAGE_KEYS.AUTH_ACCESS_TOKEN_KEY),

    getRefreshToken: (): string | null => {
      const token = getFromStorage<string>(
        LOCAL_STORAGE_KEYS.AUTH_REFRESH_TOKEN_KEY,
      );
      const cleanToken = token ? token.replace(/^"|"$/g, '') : null;

      return cleanToken;
    },

    updateRefreshToken: (token: string): void =>
      setToStorage(LOCAL_STORAGE_KEYS.AUTH_REFRESH_TOKEN_KEY, token),

    clearRefreshToken: (): void =>
      removeFromStorage(LOCAL_STORAGE_KEYS.AUTH_REFRESH_TOKEN_KEY),

    isAuthenticated: (): boolean => !!authUtil.getAccessToken(),

    getPayloadFromToken: (token: string): Record<string, unknown> => {
      try {
        return token ? jwtDecode<Record<string, unknown>>(token) : {};
      } catch {
        console.error('Invalid token provided.');
        return {};
      }
    },
  };
})();

export default authUtil;
