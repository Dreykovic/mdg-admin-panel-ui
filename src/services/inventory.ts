import {
  CreateInventoryPayload,
  UpdateInventoryPayload,
} from '@/features/inventory/types';
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
            url: `stock/inventory/get/${productId}`,
          };
        },
        providesTags: ['INVENTORIES'],
      },
    ),

    createInventory: builder.mutation({
      query: (data: CreateInventoryPayload) => ({
        url: 'stock/inventory/create',
        method: 'POST',
        body: {
          sku: data.sku,
          warehouseId: data.warehouseId,
          inventoryMetaData: data.inventoryMetaData,
        },
      }),
      invalidatesTags: ['INVENTORIES'],
    }),
    updateInventory: builder.mutation<
      ListResponse<Inventory>,
      { id: string; body: Partial<UpdateInventoryPayload> }
    >({
      query: ({ id, body }) => ({
        url: `stock/inventory/update/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['INVENTORIES'],
    }),

    getInventorySummary: builder.query<any, void>({
      query: () => ({
        url: 'stock/inventory/summary',
      }),
      providesTags: ['INVENTORIES'],
    }),

    updateInventoryQuantity: builder.mutation<
      { inventory: Inventory },
      { inventoryId: string; quantity: number }
    >({
      query: (data) => ({
        url: `stock/inventory/${data.inventoryId}/quantity`,
        method: 'PATCH',
        body: {
          quantity: data.quantity,
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
  useGetInventoryQuery,
  useCreateInventoryMutation,
  useGetInventorySummaryQuery,
  useUpdateInventoryQuantityMutation,

  useUpdateInventoryMutation,
} = inventoryApi;
