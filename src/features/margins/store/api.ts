import apiSlice from '@/store/api-slice';
import { PaginationResponse } from '@/types/api';
import { MarginLevel } from '@/types/entity';

const marginApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
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
  }),
  overrideExisting: false,
});
// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetSomeMarginsQuery,
  useCreateMarginMutation,
  useEditMarginMutation,
  useDeleteMarginMutation,
} = marginApi;
