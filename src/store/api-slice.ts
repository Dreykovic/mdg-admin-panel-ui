import { ListResponse } from '@/types/api';
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
import { baseApiSlice } from './base-api-slice';

const apiSlice = baseApiSlice.injectEndpoints({
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
  overrideExisting: false,
});
// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  /**Auth */
  useSignInMutation,
  useSignOutMutation,
  /**Categories */
  useCreateCategoryMutation,
  useEditCategoryMutation,
  useDeleteCategoryMutation,

  useGetCategoriesListQuery,
  /**MArgins */
  useCreateMarginMutation,
  useEditMarginMutation,
  useDeleteMarginMutation,
  useGetMarginsListQuery,
  /**UNits */
  useCreateOriginMutation,
  useEditOriginMutation,
  useDeleteOriginMutation,
  useGetOriginsListQuery,

  /**Suppliers */
  useCreateSupplierMutation,
  useEditSupplierMutation,
  useDeleteSupplierMutation,

  useGetSuppliersListQuery,
  /**UNits */
  useCreateUnitMutation,
  useEditUnitMutation,
  useDeleteUnitMutation,
  useGetUnitsListQuery,

  /**Products */
  useEditProductMutation,
  useDeleteProductMutation,
  useGetUniqueProductQuery,
  useGetProductsListQuery,
  useCreateProductMutation,
  useCreateProductConversionSettingMutation,
  useDeleteProductConversionSettingMutation,
  /**Recipes */

  useCreateRecipeMutation,
  useEditRecipeMutation,
  useDeleteRecipeMutation,
  useGetUniqueRecipeQuery,
  /**Ingredient */

  useCreateIngredientMutation,
  useEditIngredientMutation,
  useDeleteIngredientMutation,
  useGetIngredientsQuery,
  /**Steps */

  useCreateStepMutation,
  useEditStepMutation,
  useDeleteStepMutation,
  useGetStepsQuery,
} = apiSlice;
export type PrefetchEndpoints = keyof (typeof apiSlice)['endpoints']; // 🔥 Récupère tous les endpoints
