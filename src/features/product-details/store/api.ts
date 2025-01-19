import apiSlice from '@/store/api-slice';
import { ListResponse } from '@/types/api';
import { Product } from '@/types/entity';

const productDetailsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUniqueProduct: builder.query<
      ListResponse<Product>,
      { productId: string }
    >({
      query: (args) => {
        const { productId } = args;

        return {
          url: `resources/product-resources/products/details/${productId}`,
        };
      },
      providesTags: ['PRODUCTS'], // Ajouter un tag
    }),

    editProduct: builder.mutation({
      query: (data: Partial<Product>) => ({
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
  useEditProductMutation,
  useDeleteProductMutation,
  useGetUniqueProductQuery,
} = productDetailsApi;
