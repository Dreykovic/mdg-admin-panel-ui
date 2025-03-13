import { ListResponse } from '@/types/api';
import { Origin } from '@/types/entity';

import { apiSlice } from '.';

const originApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /**Origins */

    createOrigin: builder.mutation({
      query: (data: Partial<Origin>) => ({
        url: 'catalog/product-catalog/origins/save',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['ORIGINS'], // Invalider les caches
    }),
    editOrigin: builder.mutation({
      query: (data: Origin) => ({
        url: `catalog/product-catalog/origins/update/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['ORIGINS'], // Invalider les caches
    }),
    deleteOrigin: builder.mutation({
      query: (data: { id: number }) => ({
        url: `catalog/product-catalog/origins/delete`,
        method: 'DELETE',
        body: data,
      }),
      invalidatesTags: ['ORIGINS'], // Invalider les caches
    }),
    getOriginsList: builder.query<ListResponse<Origin[]>, void>({
      query: () => {
        return {
          url: `catalog/product-catalog/origins/list`,
        };
      },
      providesTags: ['ORIGINS'], // Ajouter un tag
    }),
  }),
  overrideExisting: false,
});
// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useCreateOriginMutation,
  useEditOriginMutation,
  useDeleteOriginMutation,
  useGetOriginsListQuery,
} = originApi;
export type PrefetchEndpoints = keyof (typeof apiSlice)['endpoints']; // 🔥 Récupère tous les endpoints
