import apiSlice from '@/store/api-slice';
import { PaginationResponse } from '@/types/api';
import { Product } from '@/types/entity';

const productDetailApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSomeProducts: builder.query<
      PaginationResponse<Product[]>,
      { page?: number; filters?: string; pageSize?: number }
    >({
      query: (args) => {
        const { page, filters, pageSize } = args;

        return {
          url: `resources/product-resources/products`,
          params: { page, filters, pageSize },
        };
      },
      providesTags: ['PRODUCTS'], // Ajouter un tag
    }),
    createProduct: builder.mutation({
      query: (data: Partial<Product>) => ({
        url: 'resources/product-resources/products/save',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['PRODUCTS'], // Invalider les caches
    }),
    editProduct: builder.mutation({
      query: (data: Product) => ({
        url: `resources/product-resources/products/update/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['PRODUCTS'], // Invalider les caches
    }),
    deleteProduct: builder.mutation({
      query: (data: { id: number }) => ({
        url: `resources/product-resources/products/delete`,
        method: 'DELETE',
        body: data,
      }),
      invalidatesTags: ['PRODUCTS'], // Invalider les caches
    }),
  }),
  overrideExisting: false,
});
// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetSomeProductsQuery,
  useCreateProductMutation,
  useEditProductMutation,
  useDeleteProductMutation,
} = productDetailApi;
