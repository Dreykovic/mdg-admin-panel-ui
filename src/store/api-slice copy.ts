import apiSlice from '@/store/api-slice';
import { PaginationResponse } from '@/types/api';
import { Origin } from '@/types/entity';

const FilteredQueryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
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
  }),
  overrideExisting: false,
});
// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {} = FilteredQueryApi;
