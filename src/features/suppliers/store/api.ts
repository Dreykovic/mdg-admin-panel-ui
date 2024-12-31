import apiSlice from '@/store/api-slice';
import { Supplier } from '@/types/entity';

import { PaginationResponse } from '@/types/api';

const supplierApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSomeSuppliers: builder.query<
      PaginationResponse<Supplier[]>,
      { page?: number; filters?: string; pageSize?: number }
    >({
      query: (args) => {
        const { page, filters, pageSize } = args;

        return {
          url: `resources/suppliers`,
          params: { page, filters, pageSize },
        };
      },
      providesTags: ['SUPPLIERS'], // Ajouter un tag
    }),
    createSupplier: builder.mutation({
      query: (data: Partial<Supplier>) => ({
        url: 'resources/suppliers/save',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['SUPPLIERS'], // Invalider les caches
    }),
    editSupplier: builder.mutation({
      query: (data: Supplier) => ({
        url: `resources/suppliers/update/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['SUPPLIERS'], // Invalider les caches
    }),
    deleteSupplier: builder.mutation({
      query: (data: { id: number }) => ({
        url: `resources/suppliers/delete`,
        method: 'DELETE',
        body: data,
      }),
      invalidatesTags: ['SUPPLIERS'], // Invalider les caches
    }),
  }),
  overrideExisting: false,
});
// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetSomeSuppliersQuery,
  useCreateSupplierMutation,
  useEditSupplierMutation,
  useDeleteSupplierMutation,
} = supplierApi;
