import { ListResponse } from '@/types/api';
import { UnitOfMeasure } from '@/types/entity';

import { apiSlice } from '.';

const unitOfMeasureApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /** Units*/
    getUnitsList: builder.query<ListResponse<UnitOfMeasure[]>, void>({
      query: () => {
        return {
          url: `catalog/us-o-m/list`,
        };
      },
      providesTags: ['UOM'], // Ajouter un tag
    }),

    createUnit: builder.mutation({
      query: (data: Partial<UnitOfMeasure>) => ({
        url: 'catalog/us-o-m/save',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['UOM'], // Invalider les caches
    }),
    editUnit: builder.mutation({
      query: (data: UnitOfMeasure) => ({
        url: `catalog/us-o-m/update/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['UOM'], // Invalider les caches
    }),
    deleteUnit: builder.mutation({
      query: (data: { id: number }) => ({
        url: `catalog/us-o-m/delete`,
        method: 'DELETE',
        body: data,
      }),
      invalidatesTags: ['UOM'], // Invalider les caches
    }),
  }),
  overrideExisting: false,
});
// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  /**UNits */
  useCreateUnitMutation,
  useEditUnitMutation,
  useDeleteUnitMutation,
  useGetUnitsListQuery,
} = unitOfMeasureApi;
