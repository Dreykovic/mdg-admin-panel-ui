import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import env from '@/config/env';
import { ApiResponse, ListResponse } from '@/types/api';
import {
  MarginLevel,
  Origin,
  Product,
  ProductCategory,
  Supplier,
  UnitOfMeasure,
} from '@/types/entity';
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
  tagTypes: [
    'CATEGORIES',
    'SUPPLIERS',
    'MARGINS',
    'UOM',
    'PRODUCTS',
    'ORIGINS',
    'RECIPES',
    'STEPS',
    'INGREDIENTS',
  ], // Exemple : tags pour cache invalidation
  endpoints: (builder) => ({
    getCategoriesList: builder.query<ListResponse<ProductCategory[]>, void>({
      query: () => {
        return {
          url: `resources/product-resources/categories/list`,
        };
      },
      providesTags: ['CATEGORIES'], // Ajouter un tag
    }),
    getMarginsList: builder.query<ListResponse<MarginLevel[]>, void>({
      query: () => {
        return {
          url: `resources/product-resources/margins/list`,
        };
      },
      providesTags: ['MARGINS'], // Ajouter un tag
    }),
    getUnitsList: builder.query<ListResponse<UnitOfMeasure[]>, void>({
      query: () => {
        return {
          url: `resources/us-o-m/list`,
        };
      },
      providesTags: ['UOM'], // Ajouter un tag
    }),
    getSuppliersList: builder.query<ListResponse<Supplier[]>, void>({
      query: () => {
        return {
          url: `resources/product-resources/suppliers/list`,
        };
      },
      providesTags: ['SUPPLIERS'], // Ajouter un tag
    }),
    getOriginsList: builder.query<ListResponse<Origin[]>, void>({
      query: () => {
        return {
          url: `resources/product-resources/origins/list`,
        };
      },
      providesTags: ['ORIGINS'], // Ajouter un tag
    }),
    getProductsList: builder.query<ListResponse<Product[]>, void>({
      query: () => {
        return {
          url: `resources/product-resources/products/list`,
        };
      },
      providesTags: ['PRODUCTS'], // Ajouter un tag
    }),
  }),
});
export const {
  useGetCategoriesListQuery,
  useGetMarginsListQuery,
  useGetUnitsListQuery,
  useGetSuppliersListQuery,
  useGetOriginsListQuery,
  useGetProductsListQuery,
} = apiSlice;
export default apiSlice;
