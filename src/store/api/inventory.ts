import { CreateInventoryPayload } from '@/features/inventory/types';
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
        providesTags: ['INVENTORIES'],
      },
    ),

    createInventory: builder.mutation({
      query: (data: CreateInventoryPayload) => ({
        url: 'inventory/create',
        method: 'POST',
        body: {
          sku: data.sku,
          warehouseId: data.warehouseId,
          inventoryMetaData: data.inventoryMetaData,
        },
      }),
      invalidatesTags: ['INVENTORIES'],
    }),

    getInventorySummary: builder.query<any, void>({
      query: () => ({
        url: 'inventory/summary',
      }),
      providesTags: ['INVENTORIES'],
    }),

    updateInventoryQuantity: builder.mutation<
      { inventory: Inventory },
      { inventoryId: string; quantity: number }
    >({
      query: (data) => ({
        url: `inventory/${data.inventoryId}/quantity`,
        method: 'PATCH',
        body: {
          quantity: data.quantity,
        },
      }),
      invalidatesTags: ['INVENTORIES'],
    }),

    createStockMovement: builder.mutation<{ movement: any }, any>({
      query: (data) => ({
        url: 'inventory/movement',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['INVENTORIES'],
    }),

    getStockMovement: builder.query<any, string>({
      query: (movementId) => ({
        url: `inventory/movement/${movementId}`,
      }),
      providesTags: (result, error, movementId) => [
        { type: 'INVENTORIES', id: `MOVEMENT-${movementId}` },
      ],
    }),

    getRecentMovements: builder.query<any, number | void>({
      query: (limit = 10) => ({
        url: `inventory/movements/recent?limit=${limit}`,
      }),
      providesTags: ['INVENTORIES'],
    }),

    processStockMovement: builder.mutation<
      { result: any },
      {
        movementId: string;
        action: 'approve' | 'start' | 'complete' | 'cancel';
      }
    >({
      query: (data) => ({
        url: `inventory/movement/${data.movementId}/process`,
        method: 'POST',
        body: {
          action: data.action,
        },
      }),
      invalidatesTags: (result, error, { movementId }) => [
        'INVENTORIES',
        { type: 'INVENTORIES', id: `MOVEMENT-${movementId}` },
      ],
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
  useCreateStockMovementMutation,
  useGetStockMovementQuery,
  useGetRecentMovementsQuery,
  useProcessStockMovementMutation,
} = inventoryApi;
