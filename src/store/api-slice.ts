import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import env from '@/config/env';
import { ApiResponse, ListResponse, PaginationResponse } from '@/types/api';
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
  User,
  VolumeConversion,
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
    'VOLUME_CONVERSION',
  ], // Exemple : tags pour cache invalidation
  endpoints: (builder) => ({
    /**Auth */
    signIn: builder.mutation({
      query: (data: Partial<User>) => ({
        url: 'admin-auth/sign-in',
        method: 'POST',
        body: data,
      }),
    }),
    signOut: builder.mutation({
      query: (data: { token: string | null }) => ({
        url: 'admin-auth/sign-out',
        method: 'DELETE',
        body: data,
      }),
    }),

    /**Categories */
    getSomeCategories: builder.query<
      PaginationResponse<ProductCategory[]>,
      { page?: number; filters?: string; pageSize?: number }
    >({
      query: (args) => {
        const { page, filters, pageSize } = args;

        return {
          url: `resources/product-resources/categories`,
          params: { page, filters, pageSize },
        };
      },
      providesTags: ['CATEGORIES'], // Ajouter un tag
    }),
    createCategory: builder.mutation({
      query: (data: Partial<ProductCategory>) => ({
        url: 'resources/product-resources/categories/save',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['CATEGORIES'], // Invalider les caches
    }),
    editCategory: builder.mutation({
      query: (data: ProductCategory) => ({
        url: `resources/product-resources/categories/update/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['CATEGORIES'], // Invalider les caches
    }),
    deleteCategory: builder.mutation({
      query: (data: { id: number }) => ({
        url: `resources/product-resources/categories/delete`,
        method: 'DELETE',
        body: data,
      }),
      invalidatesTags: ['CATEGORIES'], // Invalider les caches
    }),
    getCategoriesList: builder.query<ListResponse<ProductCategory[]>, void>({
      query: () => {
        return {
          url: `resources/product-resources/categories/list`,
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
          url: `resources/product-resources/margins`,
          params: { page, filters, pageSize },
        };
      },
      providesTags: ['MARGINS'], // Ajouter un tag
    }),
    createMargin: builder.mutation({
      query: (data: Partial<MarginLevel>) => ({
        url: 'resources/product-resources/margins/save',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['MARGINS'], // Invalider les caches
    }),
    editMargin: builder.mutation({
      query: (data: MarginLevel) => ({
        url: `resources/product-resources/margins/update/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['MARGINS'], // Invalider les caches
    }),
    deleteMargin: builder.mutation({
      query: (data: { id: number }) => ({
        url: `resources/product-resources/margins/delete`,
        method: 'DELETE',
        body: data,
      }),
      invalidatesTags: ['MARGINS'], // Invalider les caches
    }),
    getMarginsList: builder.query<ListResponse<MarginLevel[]>, void>({
      query: () => {
        return {
          url: `resources/product-resources/margins/list`,
        };
      },
      providesTags: ['MARGINS'], // Ajouter un tag
    }),
    /** */
    /** Units*/
    getUnitsList: builder.query<ListResponse<UnitOfMeasure[]>, void>({
      query: () => {
        return {
          url: `resources/us-o-m/list`,
        };
      },
      providesTags: ['UOM'], // Ajouter un tag
    }),
    getSomeUnits: builder.query<
      PaginationResponse<UnitOfMeasure[]>,
      { page?: number; filters?: string; pageSize?: number }
    >({
      query: (args) => {
        const { page, filters, pageSize } = args;

        return {
          url: `resources/us-o-m`,
          params: { page, filters, pageSize },
        };
      },
      providesTags: ['UOM'], // Ajouter un tag
    }),
    createUnit: builder.mutation({
      query: (data: Partial<UnitOfMeasure>) => ({
        url: 'resources/us-o-m/save',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['UOM'], // Invalider les caches
    }),
    editUnit: builder.mutation({
      query: (data: UnitOfMeasure) => ({
        url: `resources/us-o-m/update/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['UOM'], // Invalider les caches
    }),
    deleteUnit: builder.mutation({
      query: (data: { id: number }) => ({
        url: `resources/us-o-m/delete`,
        method: 'DELETE',
        body: data,
      }),
      invalidatesTags: ['UOM'], // Invalider les caches
    }),
    /**Origins */
    getSomeOrigins: builder.query<
      PaginationResponse<Origin[]>,
      { page?: number; filters?: string; pageSize?: number }
    >({
      query: (args) => {
        const { page, filters, pageSize } = args;

        return {
          url: `resources/product-resources/origins`,
          params: { page, filters, pageSize },
        };
      },
      providesTags: ['ORIGINS'], // Ajouter un tag
    }),
    createOrigin: builder.mutation({
      query: (data: Partial<Origin>) => ({
        url: 'resources/product-resources/origins/save',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['ORIGINS'], // Invalider les caches
    }),
    editOrigin: builder.mutation({
      query: (data: Origin) => ({
        url: `resources/product-resources/origins/update/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['ORIGINS'], // Invalider les caches
    }),
    deleteOrigin: builder.mutation({
      query: (data: { id: number }) => ({
        url: `resources/product-resources/origins/delete`,
        method: 'DELETE',
        body: data,
      }),
      invalidatesTags: ['ORIGINS'], // Invalider les caches
    }),

    /** Suppliers*/
    getSomeSuppliers: builder.query<
      PaginationResponse<Supplier[]>,
      { page?: number; filters?: string; pageSize?: number }
    >({
      query: (args) => {
        const { page, filters, pageSize } = args;

        return {
          url: `resources/product-resources/suppliers`,
          params: { page, filters, pageSize },
        };
      },
      providesTags: ['SUPPLIERS'], // Ajouter un tag
    }),
    createSupplier: builder.mutation({
      query: (data: Partial<Supplier>) => ({
        url: 'resources/product-resources/suppliers/save',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['SUPPLIERS'], // Invalider les caches
    }),
    editSupplier: builder.mutation({
      query: (data: Supplier) => ({
        url: `resources/product-resources/suppliers/update/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['SUPPLIERS'], // Invalider les caches
    }),
    deleteSupplier: builder.mutation({
      query: (data: { id: number }) => ({
        url: `resources/product-resources/suppliers/delete`,
        method: 'DELETE',
        body: data,
      }),
      invalidatesTags: ['SUPPLIERS'], // Invalider les caches
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
    /**Products */
    getSomeProducts: builder.query<
      PaginationResponse<Product[]>,
      { page?: number; filters?: string; pageSize?: number }
    >({
      query: (args) => {
        const { page, filters, pageSize } = args;

        return {
          url: `resources/product-resources/products`,
          params: { page, filters, pageSize },
        };
      },
      providesTags: ['PRODUCTS'], // Ajouter un tag
    }),
    createProduct: builder.mutation({
      query: (data: Partial<Product>) => ({
        url: 'resources/product-resources/products/save',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['PRODUCTS'], // Invalider les caches
    }),
    getUniqueProduct: builder.query<
      ListResponse<Product>,
      { productId: string }
    >({
      query: (args) => {
        const { productId } = args;

        return {
          url: `resources/product-resources/products/details/${productId}`,
        };
      },
      providesTags: ['PRODUCTS'], // Ajouter un tag
    }),

    editProduct: builder.mutation({
      query: (data: Partial<Product>) => ({
        url: `resources/product-resources/products/update/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['PRODUCTS'], // Invalider les caches
    }),
    deleteProduct: builder.mutation({
      query: (data: { id: string }) => ({
        url: `resources/product-resources/products/delete`,
        method: 'DELETE',
        body: data,
      }),
      invalidatesTags: ['PRODUCTS'], // Invalider les caches
    }),
    getProductsList: builder.query<ListResponse<Product[]>, void>({
      query: () => {
        return {
          url: `resources/product-resources/products/list`,
        };
      },
      providesTags: ['PRODUCTS'], // Ajouter un tag
    }),
    createProductConversionSetting: builder.mutation({
      query: (data: Partial<VolumeConversion>) => ({
        url: 'conversion/volume/save',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['PRODUCTS', 'VOLUME_CONVERSION'], // Invalider les caches
    }),
    deleteProductConversionSetting: builder.mutation({
      query: (data: { id: number }) => ({
        url: 'conversion/volume/delete',
        method: 'DELETE',
        body: data,
      }),
      invalidatesTags: ['PRODUCTS', 'VOLUME_CONVERSION'], // Invalider les caches
    }),
    /**Recipes */
    getSomeRecipes: builder.query<
      PaginationResponse<Recipe[]>,
      { page?: number; filters?: string; pageSize?: number }
    >({
      query: (args) => {
        const { page, filters, pageSize } = args;

        return {
          url: `resources/recipe-resources/recipes`,
          params: { page, filters, pageSize },
        };
      },
      providesTags: ['RECIPES'], // Ajouter un tag
    }),
    getUniqueRecipe: builder.query<ListResponse<Recipe>, { recipeId: number }>({
      query: (args) => {
        const { recipeId } = args;

        return {
          url: `resources/recipe-resources/recipes/details/${recipeId}`,
        };
      },
      providesTags: ['RECIPES'], // Ajouter un tag
    }),
    createRecipe: builder.mutation({
      query: (data: Partial<Recipe>) => ({
        url: 'resources/recipe-resources/recipes/save',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['RECIPES'], // Invalider les caches
    }),
    editRecipe: builder.mutation({
      query: (data: Recipe) => ({
        url: `resources/recipe-resources/recipes/update/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['RECIPES'], // Invalider les caches
    }),
    deleteRecipe: builder.mutation({
      query: (data: { id: number }) => ({
        url: `resources/recipe-resources/recipes/delete`,
        method: 'DELETE',
        body: data,
      }),
      invalidatesTags: ['RECIPES'], // Invalider les caches
    }),
    /**Ingredients */
    getSomeIngredients: builder.query<
      PaginationResponse<Ingredient[]>,
      { page?: number; filters?: string; pageSize?: number }
    >({
      query: (args) => {
        const { page, filters, pageSize } = args;

        return {
          url: `resources/recipe-resources/ingredients`,
          params: { page, filters, pageSize },
        };
      },
      providesTags: ['INGREDIENTS'], // Ajouter un tag
    }),
    getIngredients: builder.query<
      ListResponse<Ingredient[]>,
      { filters?: string }
    >({
      query: (args) => {
        const { filters } = args;

        return {
          url: `resources/recipe-resources/ingredients/list`,
          params: { filters },
        };
      },
      providesTags: ['INGREDIENTS'], // Ajouter un tag
    }),
    createIngredient: builder.mutation({
      query: (data: Partial<Ingredient>) => ({
        url: 'resources/recipe-resources/ingredients/save',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['INGREDIENTS'], // Invalider les caches
    }),
    editIngredient: builder.mutation({
      query: (data: Ingredient) => ({
        url: `resources/recipe-resources/ingredients/update/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['INGREDIENTS'], // Invalider les caches
    }),
    deleteIngredient: builder.mutation({
      query: (data: { id: number }) => ({
        url: `resources/recipe-resources/ingredients/delete`,
        method: 'DELETE',
        body: data,
      }),
      invalidatesTags: ['INGREDIENTS'], // Invalider les caches
    }),
    /**Step */
    getSomeSteps: builder.query<
      PaginationResponse<Step[]>,
      { page?: number; filters?: string; pageSize?: number }
    >({
      query: (args) => {
        const { page, filters, pageSize } = args;

        return {
          url: `resources/recipe-resources/steps`,
          params: { page, filters, pageSize },
        };
      },
      providesTags: ['STEPS'], // Ajouter un tag
    }),
    getSteps: builder.query<ListResponse<Step[]>, { filters?: string }>({
      query: (args) => {
        const { filters } = args;

        return {
          url: `resources/recipe-resources/steps/list`,
          params: { filters },
        };
      },
      providesTags: ['STEPS'], // Ajouter un tag
    }),
    createStep: builder.mutation({
      query: (data: Partial<Step>) => ({
        url: 'resources/recipe-resources/steps/save',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['STEPS'], // Invalider les caches
    }),
    editStep: builder.mutation({
      query: (data: Step) => ({
        url: `resources/recipe-resources/steps/update/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['STEPS'], // Invalider les caches
    }),
    deleteStep: builder.mutation({
      query: (data: { id: number }) => ({
        url: `resources/recipe-resources/steps/delete`,
        method: 'DELETE',
        body: data,
      }),
      invalidatesTags: ['STEPS'], // Invalider les caches
    }),
  }),
});
export type PrefetchEndpoints = keyof (typeof apiSlice)['endpoints']; // 🔥 Récupère tous les endpoints

export const {
  /**Auth */
  useSignInMutation,
  useSignOutMutation,
  /**Categories */
  useGetSomeCategoriesQuery,
  useCreateCategoryMutation,
  useEditCategoryMutation,
  useDeleteCategoryMutation,

  useGetCategoriesListQuery,
  /**MArgins */
  useGetSomeMarginsQuery,
  useCreateMarginMutation,
  useEditMarginMutation,
  useDeleteMarginMutation,
  useGetMarginsListQuery,
  /**UNits */
  useGetSomeOriginsQuery,
  useCreateOriginMutation,
  useEditOriginMutation,
  useDeleteOriginMutation,
  useGetOriginsListQuery,

  /**Suppliers */
  useGetSomeSuppliersQuery,
  useCreateSupplierMutation,
  useEditSupplierMutation,
  useDeleteSupplierMutation,

  useGetSuppliersListQuery,
  /**UNits */
  useGetSomeUnitsQuery,
  useCreateUnitMutation,
  useEditUnitMutation,
  useDeleteUnitMutation,
  useGetUnitsListQuery,

  /**Products */
  useEditProductMutation,
  useDeleteProductMutation,
  useGetUniqueProductQuery,
  useGetProductsListQuery,
  useGetSomeProductsQuery,
  useCreateProductMutation,
  useCreateProductConversionSettingMutation,
  useDeleteProductConversionSettingMutation,
  /**Recipes */
  useGetSomeRecipesQuery,
  useCreateRecipeMutation,
  useEditRecipeMutation,
  useDeleteRecipeMutation,
  useGetUniqueRecipeQuery,
  /**Ingredient */
  useGetSomeIngredientsQuery,
  useCreateIngredientMutation,
  useEditIngredientMutation,
  useDeleteIngredientMutation,
  useGetIngredientsQuery,
  /**Steps */
  useGetSomeStepsQuery,
  useCreateStepMutation,
  useEditStepMutation,
  useDeleteStepMutation,
  useGetStepsQuery,
  usePrefetch,
} = apiSlice;
export default apiSlice;
