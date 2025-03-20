import { ListResponse } from '@/types/api';
import { ProductCategory } from '@/types/entity';

import { apiSlice } from '.';

const productCategoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /**Categories */

    createCategory: builder.mutation({
      query: (data: Partial<ProductCategory>) => ({
        url: 'catalog/product-catalog/categories/save',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['CATEGORIES'], // Invalider les caches
    }),
    editCategory: builder.mutation({
      query: (data: ProductCategory) => ({
        url: `catalog/product-catalog/categories/update/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['CATEGORIES'], // Invalider les caches
    }),
    deleteCategory: builder.mutation({
      query: (data: { id: number }) => ({
        url: `catalog/product-catalog/categories/delete`,
        method: 'DELETE',
        body: data,
      }),
      invalidatesTags: ['CATEGORIES'], // Invalider les caches
    }),
    getCategoriesList: builder.query<ListResponse<ProductCategory[]>, void>({
      query: () => {
        return {
          url: `catalog/product-catalog/categories/list`,
        };
      },
      providesTags: ['CATEGORIES'], // Ajouter un tag
    }),
  }),
  overrideExisting: false,
});
// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  /**Categories */
  useCreateCategoryMutation,
  useEditCategoryMutation,
  useDeleteCategoryMutation,

  useGetCategoriesListQuery,
} = productCategoryApi;
