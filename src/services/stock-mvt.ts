import { StockMovementData } from '@/features/inventory/types';

import { apiSlice } from '.';

const stockMvtApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createStockMovement: builder.mutation({
      query: (data: StockMovementData) => ({
        url: 'stock/stock-movement/save',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['INVENTORIES', 'STOCK_MOVEMENTS'],
    }),

    getStockMovement: builder.query<any, string>({
      query: (movementId) => ({
        url: `stock/stock-movement/${movementId}`,
      }),
      providesTags: ['STOCK_MOVEMENTS'],
    }),

    getRecentMovements: builder.query<any, number | void>({
      query: (limit = 10) => ({
        url: `stock/stock-movement/recent?limit=${limit}`,
      }),
      providesTags: ['INVENTORIES', 'STOCK_MOVEMENTS'],
    }),

    processStockMovement: builder.mutation<
      { result: any },
      {
        movementId: string;
        action: 'approve' | 'start' | 'complete' | 'cancel';
      }
    >({
      query: (data) => ({
        url: `stock/stock-movement/${data.movementId}/process`,
        method: 'POST',
        body: {
          action: data.action,
        },
      }),
      invalidatesTags: ['INVENTORIES', 'STOCK_MOVEMENTS'],
    }),
  }),
  overrideExisting: false,
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useCreateStockMovementMutation,
  useGetStockMovementQuery,
  useGetRecentMovementsQuery,
  useProcessStockMovementMutation,
} = stockMvtApi;
