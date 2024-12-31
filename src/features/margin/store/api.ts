import apiSlice from '@/store/api-slice';
import { MarginLevel } from '@/types/entity';

import { PaginationResponse } from '@/types/api';

const marginApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSomeMargins: builder.query<
      PaginationResponse<MarginLevel[]>,
      { page?: number; filters?: string; pageSize?: number }
    >({
      query: (args) => {
        const { page, filters, pageSize } = args;

        return {
          url: `resources/margins`,
          params: { page, filters, pageSize },
        };
      },
      providesTags: ['MARGINS'], // Ajouter un tag
    }),
    createMargin: builder.mutation({
      query: (data: Partial<MarginLevel>) => ({
        url: 'resources/margins/save',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['MARGINS'], // Invalider les caches
    }),
    editMargin: builder.mutation({
      query: (data: MarginLevel) => ({
        url: `resources/margins/update/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['MARGINS'], // Invalider les caches
    }),
    deleteMargin: builder.mutation({
      query: (data: { id: number }) => ({
        url: `resources/margins/delete`,
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
