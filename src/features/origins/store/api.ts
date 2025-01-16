import apiSlice from '@/store/api-slice';
import { PaginationResponse } from '@/types/api';
import { Origin } from '@/types/entity';

const originsApi = apiSlice.injectEndpoints({
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
  }),
  overrideExisting: false,
});
// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetSomeOriginsQuery,
  useCreateOriginMutation,
  useEditOriginMutation,
  useDeleteOriginMutation,
} = originsApi;
