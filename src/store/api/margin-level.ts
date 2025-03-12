import { ListResponse } from '@/types/api';
import { MarginLevel } from '@/types/entity';

import { apiSlice } from '.';

const marginLevelApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /** Margins*/

    createMargin: builder.mutation({
      query: (data: Partial<MarginLevel>) => ({
        url: 'catalog/product-catalog/margins/save',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['MARGINS'], // Invalider les caches
    }),
    editMargin: builder.mutation({
      query: (data: MarginLevel) => ({
        url: `catalog/product-catalog/margins/update/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['MARGINS'], // Invalider les caches
    }),
    deleteMargin: builder.mutation({
      query: (data: { id: number }) => ({
        url: `catalog/product-catalog/margins/delete`,
        method: 'DELETE',
        body: data,
      }),
      invalidatesTags: ['MARGINS'], // Invalider les caches
    }),
    getMarginsList: builder.query<ListResponse<MarginLevel[]>, void>({
      query: () => {
        return {
          url: `catalog/product-catalog/margins/list`,
        };
      },
      providesTags: ['MARGINS'], // Ajouter un tag
    }),
    /** */
  }),
  overrideExisting: false,
});
// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  /**MArgins */
  useCreateMarginMutation,
  useEditMarginMutation,
  useDeleteMarginMutation,
  useGetMarginsListQuery,
} = marginLevelApi;
