import { ListResponse } from '@/types/api';
import { Inventory } from '@/types/entity';

import { apiSlice } from '.';

const inventoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Inventory
    getInventory: builder.query<ListResponse<Inventory>, { productId: string }>(
      {
        query: (args) => {
          const { productId } = args;

          return {
            url: `inventory/get/${productId}`,
          };
        },
        providesTags: ['INVENTORIES'], // Ajouter un tag
      },
    ),
    createInventory: builder.mutation({
      query: (data: {
        sku: string;
        inventoryMetaData: Partial<Inventory>;
      }) => ({
        url: 'inventory/create',
        method: 'POST',
        body: {
          sku: data.sku,
          inventoryMetaData: {
            quantity: data.inventoryMetaData.quantity,
            reorderThreshold: data.inventoryMetaData.reorderThreshold,
            reorderQuantity: data.inventoryMetaData.reorderQuantity,
            availableQuantity: data.inventoryMetaData.availableQuantity,
            inStock: data.inventoryMetaData.inStock,
            backOrderable: data.inventoryMetaData.backOrderable,
          },
        },
      }),
      invalidatesTags: ['INVENTORIES'],
    }),
  }),
  overrideExisting: false,
});
// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  // Inventory
  useGetInventoryQuery,
  useCreateInventoryMutation,
} = inventoryApi;
