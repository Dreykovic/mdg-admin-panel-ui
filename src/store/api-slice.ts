import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import env from '@/config/env';
import { ApiResponse } from '@/types/api';
import authUtil from '@/utils/auth-utils';

const baseQuery = fetchBaseQuery({
  baseUrl: env.baseUrl,
  prepareHeaders: (headers, { endpoint }) => {
    const endpointsWithoutAuth = [`${env.baseUrl}/admin-auth/sign-in`];
    if (!endpointsWithoutAuth.includes(endpoint)) {
      const token = authUtil.getAccessToken();

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
    }
    return headers;
  },
});

// Wrapper pour gérer automatiquement le rafraîchissement du token
const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  // Si une erreur 401 est retournée, essayez de rafraîchir le token
  if (result.error && result.error.status === 401) {
    console.warn('Access token expired, attempting to refresh...');

    const refreshToken = authUtil.getRefreshToken();

    if (refreshToken) {
      // Essayez de renouveler l'access token
      const refreshResult = await baseQuery(
        {
          url: '/admin-auth/refresh', // Endpoint pour rafraîchir le token
          method: 'POST',
          body: { token: refreshToken },
        },
        api,
        extraOptions,
      );

      if (refreshResult.data) {
        const data = refreshResult.data as ApiResponse<{
          accessToken: string;
          refreshToken: string;
        }>;

        // Mettez à jour le localStorage avec le nouvel access token
        authUtil.updateAccessToken(data.content.accessToken);
        authUtil.updateRefreshToken(data.content.refreshToken);

        // Rejouez la requête initiale avec le nouveau token
        result = await baseQuery(args, api, extraOptions);
      } else {
        console.error('Failed to refresh token, logging out...');
        // Optionnel : ajoutez une action pour déconnecter l'utilisateur
        api.dispatch({ type: 'auth/logout' });
      }
    } else {
      console.error('No refresh token available, logging out...');
      api.dispatch({ type: 'auth/logout' });
    }
  }

  return result;
};

// Définition de l'API avec gestion des tokens
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['CATEGORIES', 'SUPPLIERS', 'MARGINS', 'UOM', 'PRODUCTS'], // Exemple : tags pour cache invalidation
  endpoints: () => ({}), // À compléter selon vos besoins
});

export default apiSlice;
