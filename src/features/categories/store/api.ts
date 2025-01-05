import apiSlice from '@/store/api-slice';
import { PaginationResponse } from '@/types/api';
import { ProductCategory } from '@/types/entity';

const appApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
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
  }),
  overrideExisting: false,
});
// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetSomeCategoriesQuery,
  useCreateCategoryMutation,
  useEditCategoryMutation,
  useDeleteCategoryMutation,
} = appApi;
