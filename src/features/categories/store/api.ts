import apiSlice from '@/store/api-slice';
import { ProductCategory } from '@/types/entity';

import { PaginationResponse } from '@/types/api';

const appApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSomeCategories: builder.query<
      PaginationResponse<Partial<ProductCategory>[]>,
      void
    >({
      query: () => `resources/categories`,
      providesTags: ['CATEGORIES'], // Ajouter un tag
    }),
  }),
  overrideExisting: false,
});
// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetSomeCategoriesQuery } = appApi;
