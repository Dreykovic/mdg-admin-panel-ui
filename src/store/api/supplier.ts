import { ListResponse } from '@/types/api';
import { Supplier } from '@/types/entity';

import { apiSlice } from '.';

const supplierApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /** Suppliers*/

    createSupplier: builder.mutation({
      query: (data: Partial<Supplier>) => ({
        url: 'catalog/product-catalog/suppliers/save',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['SUPPLIERS'], // Invalider les caches
    }),
    editSupplier: builder.mutation({
      query: (data: Supplier) => ({
        url: `catalog/product-catalog/suppliers/update/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['SUPPLIERS'], // Invalider les caches
    }),
    deleteSupplier: builder.mutation({
      query: (data: { id: number }) => ({
        url: `catalog/product-catalog/suppliers/delete`,
        method: 'DELETE',
        body: data,
      }),
      invalidatesTags: ['SUPPLIERS'], // Invalider les caches
    }),
    getSuppliersList: builder.query<ListResponse<Supplier[]>, void>({
      query: () => {
        return {
          url: `catalog/product-catalog/suppliers/list`,
        };
      },
      providesTags: ['SUPPLIERS'], // Ajouter un tag
    }),
  }),
  overrideExisting: false,
});
// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  /**Suppliers */
  useCreateSupplierMutation,
  useEditSupplierMutation,
  useDeleteSupplierMutation,

  useGetSuppliersListQuery,
} = supplierApi;
