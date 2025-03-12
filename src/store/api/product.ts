import { ListResponse } from '@/types/api';
import { Product, VolumeConversion } from '@/types/entity';

import { apiSlice } from '.';

const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /**Products */

    createProduct: builder.mutation({
      query: (data: Partial<Product>) => ({
        url: 'catalog/product-catalog/products/save',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['PRODUCTS'], // Invalider les caches
    }),
    getUniqueProduct: builder.query<
      ListResponse<Product>,
      { productId: string }
    >({
      query: (args) => {
        const { productId } = args;

        return {
          url: `catalog/product-catalog/products/details/${productId}`,
        };
      },
      providesTags: ['PRODUCTS'], // Ajouter un tag
    }),

    editProduct: builder.mutation({
      query: (data: Partial<Product>) => ({
        url: `catalog/product-catalog/products/update/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['PRODUCTS'], // Invalider les caches
    }),
    deleteProduct: builder.mutation({
      query: (data: { id: string }) => ({
        url: `catalog/product-catalog/products/delete`,
        method: 'DELETE',
        body: data,
      }),
      invalidatesTags: ['PRODUCTS'], // Invalider les caches
    }),
    getProductsList: builder.query<ListResponse<Product[]>, void>({
      query: () => {
        return {
          url: `catalog/product-catalog/products/list`,
        };
      },
      providesTags: ['PRODUCTS'], // Ajouter un tag
    }),
    createProductConversionSetting: builder.mutation({
      query: (data: Partial<VolumeConversion>) => ({
        url: 'conversion/volume/save',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['PRODUCTS', 'VOLUME_CONVERSION'], // Invalider les caches
    }),
    deleteProductConversionSetting: builder.mutation({
      query: (data: { id: number }) => ({
        url: 'conversion/volume/delete',
        method: 'DELETE',
        body: data,
      }),
      invalidatesTags: ['PRODUCTS', 'VOLUME_CONVERSION'], // Invalider les caches
    }),
  }),
  overrideExisting: false,
});
// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  /**Products */
  useEditProductMutation,
  useDeleteProductMutation,
  useGetUniqueProductQuery,
  useGetProductsListQuery,
  useCreateProductMutation,
  useCreateProductConversionSettingMutation,
  useDeleteProductConversionSettingMutation,
} = productApi;
