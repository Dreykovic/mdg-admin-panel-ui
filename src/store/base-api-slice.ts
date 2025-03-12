import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import env from '@/config/env';
import { ApiResponse, PaginationResponse } from '@/types/api';
import {
  Ingredient,
  MarginLevel,
  Origin,
  Product,
  ProductCategory,
  Recipe,
  Step,
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
const baseQueryWithReAuth = async (args: any, api: any, extraOptions: any) => {
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
export const baseApiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReAuth,
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
    'VOLUME_CONVERSION',
    'INVENTORY',
  ], // Exemple : tags pour cache invalidation
  endpoints: (builder) => ({
    /**Categories */
    getSomeCategories: builder.query<
      PaginationResponse<ProductCategory[]>,
      { page?: number; filters?: string; pageSize?: number }
    >({
      query: (args) => {
        const { page, filters, pageSize } = args;

        return {
          url: `catalog/product-catalog/categories`,
          params: { page, filters, pageSize },
        };
      },
      providesTags: ['CATEGORIES'], // Ajouter un tag
    }),

    /** Margins*/
    getSomeMargins: builder.query<
      PaginationResponse<MarginLevel[]>,
      { page?: number; filters?: string; pageSize?: number }
    >({
      query: (args) => {
        const { page, filters, pageSize } = args;

        return {
          url: `catalog/product-catalog/margins`,
          params: { page, filters, pageSize },
        };
      },
      providesTags: ['MARGINS'], // Ajouter un tag
    }),
    /** */
    /** Units*/

    getSomeUnits: builder.query<
      PaginationResponse<UnitOfMeasure[]>,
      { page?: number; filters?: string; pageSize?: number }
    >({
      query: (args) => {
        const { page, filters, pageSize } = args;

        return {
          url: `catalog/us-o-m`,
          params: { page, filters, pageSize },
        };
      },
      providesTags: ['UOM'], // Ajouter un tag
    }),
    /**Origins */
    getSomeOrigins: builder.query<
      PaginationResponse<Origin[]>,
      { page?: number; filters?: string; pageSize?: number }
    >({
      query: (args) => {
        const { page, filters, pageSize } = args;

        return {
          url: `catalog/product-catalog/origins`,
          params: { page, filters, pageSize },
        };
      },
      providesTags: ['ORIGINS'], // Ajouter un tag
    }),
    /** Suppliers*/
    getSomeSuppliers: builder.query<
      PaginationResponse<Supplier[]>,
      { page?: number; filters?: string; pageSize?: number }
    >({
      query: (args) => {
        const { page, filters, pageSize } = args;

        return {
          url: `catalog/product-catalog/suppliers`,
          params: { page, filters, pageSize },
        };
      },
      providesTags: ['SUPPLIERS'], // Ajouter un tag
    }),
    /**Products */
    getSomeProducts: builder.query<
      PaginationResponse<Product[]>,
      { page?: number; filters?: string; pageSize?: number }
    >({
      query: (args) => {
        const { page, filters, pageSize } = args;

        return {
          url: `catalog/product-catalog/products`,
          params: { page, filters, pageSize },
        };
      },
      providesTags: ['PRODUCTS'], // Ajouter un tag
    }),
    /**Recipes */
    getSomeRecipes: builder.query<
      PaginationResponse<Recipe[]>,
      { page?: number; filters?: string; pageSize?: number }
    >({
      query: (args) => {
        const { page, filters, pageSize } = args;

        return {
          url: `catalog/recipe-catalog/recipes`,
          params: { page, filters, pageSize },
        };
      },
      providesTags: ['RECIPES'], // Ajouter un tag
    }),
    /**Ingredients */
    getSomeIngredients: builder.query<
      PaginationResponse<Ingredient[]>,
      { page?: number; filters?: string; pageSize?: number }
    >({
      query: (args) => {
        const { page, filters, pageSize } = args;

        return {
          url: `catalog/recipe-catalog/ingredients`,
          params: { page, filters, pageSize },
        };
      },
      providesTags: ['INGREDIENTS'], // Ajouter un tag
    }),
    /**Step */
    getSomeSteps: builder.query<
      PaginationResponse<Step[]>,
      { page?: number; filters?: string; pageSize?: number }
    >({
      query: (args) => {
        const { page, filters, pageSize } = args;

        return {
          url: `catalog/recipe-catalog/steps`,
          params: { page, filters, pageSize },
        };
      },
      providesTags: ['STEPS'], // Ajouter un tag
    }),
  }),
});
// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  /**Auth */

  /**Categories */
  useGetSomeCategoriesQuery,

  /**MArgins */
  useGetSomeMarginsQuery,

  useGetSomeOriginsQuery,

  /**Suppliers */
  useGetSomeSuppliersQuery,

  /**UNits */
  useGetSomeUnitsQuery,

  useGetSomeProductsQuery,

  /**Recipes */
  useGetSomeRecipesQuery,

  /**Ingredient */
  useGetSomeIngredientsQuery,

  /**Steps */
  useGetSomeStepsQuery,
  usePrefetch,
} = baseApiSlice;
export type PrefetchEndpoints = keyof (typeof baseApiSlice)['endpoints']; // 🔥 Récupère tous les endpoints
