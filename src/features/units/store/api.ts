import apiSlice from '@/store/api-slice';
import { PaginationResponse } from '@/types/api';
import { UnitOfMesure } from '@/types/entity';

const unitApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSomeUnits: builder.query<
      PaginationResponse<UnitOfMesure[]>,
      { page?: number; filters?: string; pageSize?: number }
    >({
      query: (args) => {
        const { page, filters, pageSize } = args;

        return {
          url: `resources/product-resources/us-o-m`,
          params: { page, filters, pageSize },
        };
      },
      providesTags: ['UOM'], // Ajouter un tag
    }),
    createUnit: builder.mutation({
      query: (data: Partial<UnitOfMesure>) => ({
        url: 'resources/product-resources/us-o-m/save',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['UOM'], // Invalider les caches
    }),
    editUnit: builder.mutation({
      query: (data: UnitOfMesure) => ({
        url: `resources/product-resources/us-o-m/update/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['UOM'], // Invalider les caches
    }),
    deleteUnit: builder.mutation({
      query: (data: { id: number }) => ({
        url: `resources/product-resources/us-o-m/delete`,
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
  useGetSomeUnitsQuery,
  useCreateUnitMutation,
  useEditUnitMutation,
  useDeleteUnitMutation,
} = unitApi;
