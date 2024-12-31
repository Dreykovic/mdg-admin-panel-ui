import apiSlice from '@/store/api-slice';
import { ProductCategory } from '@/types/entity';

import { PaginationResponse } from '@/types/api';

const appApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSomeCategories: builder.query<
      PaginationResponse<ProductCategory[]>,
      { page?: number; filter?: object; pageSize?: number }
    >({
      query: (args) => {
        const { page, filter, pageSize } = args;
        console.log('arg: ', args);
        return {
          url: `resources/categories`,
          params: { page, filter, pageSize },
        };
      },
      providesTags: ['CATEGORIES'], // Ajouter un tag
    }),
    createCategory: builder.mutation({
      query: (data: Partial<ProductCategory>) => ({
        url: 'resources/categories/save',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['CATEGORIES'], // Invalider les caches
    }),
    editCategory: builder.mutation({
      query: (data: ProductCategory) => ({
        url: `resources/categories/update/${data.id}`,
        method: 'PUT',
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
} = appApi;
