import { ListResponse } from '@/types/api';
import { ProductTag, ProductTagLink } from '@/types/entity';

import { apiSlice } from '.';

const productTagApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get list of all product tags
    getProductTagsList: builder.query<ListResponse<ProductTag[]>, void>({
      query: () => ({
        url: `catalog/product-catalog/tags/list`,
      }),
      providesTags: ['PRODUCT_TAGS'],
    }),

    // Create a new product tag
    createProductTag: builder.mutation<ProductTag, Partial<ProductTag>>({
      query: (data) => ({
        url: 'catalog/product-catalog/tags/save',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['PRODUCT_TAGS'],
    }),

    // Update an existing product tag
    updateProductTag: builder.mutation<ProductTag, ProductTag>({
      query: (data) => ({
        url: `catalog/product-catalog/tags/update/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['PRODUCT_TAGS'],
    }),

    // Delete a product tag
    deleteProductTag: builder.mutation<void, { id: number }>({
      query: (data) => ({
        url: `catalog/product-catalog/tags/delete`,
        method: 'DELETE',
        body: data,
      }),
      invalidatesTags: ['PRODUCT_TAGS'],
    }),

    // Add a tag to a product
    addProductTagLink: builder.mutation<
      ProductTagLink,
      { productId: string; productTagId: number }
    >({
      query: (data) => ({
        url: 'catalog/product-catalog/tag-links/save',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        'PRODUCT_TAGS',
        { type: 'PRODUCT_TAGS', id: arg.productId },
      ],
    }),

    // Remove a tag from a product
    removeProductTagLink: builder.mutation<
      void,
      { productId: string; productTagId: number }
    >({
      query: (data) => ({
        url: `catalog/product-catalog/tag-links/delete`,
        method: 'DELETE',
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        'PRODUCT_TAGS',
        { type: 'PRODUCT_TAGS', id: arg.productId },
      ],
    }),
    // Get list of all product tags
    getUniqueProductTagLinks: builder.query<
      ListResponse<ProductTagLink[]>,
      { productId: string }
    >({
      query: (args) => {
        const { productId } = args;

        return {
          url: `catalog/product-catalog/tag-links/product/${productId}`,
        };
      },
      providesTags: ['PRODUCT_TAGS'], // Ajouter un tag
    }),
  }),
  overrideExisting: false,
});

// Export hooks for usage in functional components
export const {
  useGetProductTagsListQuery,
  useGetUniqueProductTagLinksQuery,
  useCreateProductTagMutation,
  useUpdateProductTagMutation,
  useDeleteProductTagMutation,
  useAddProductTagLinkMutation,
  useRemoveProductTagLinkMutation,
} = productTagApi;
