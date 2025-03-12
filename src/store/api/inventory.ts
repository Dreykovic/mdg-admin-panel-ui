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
        providesTags: ['INVENTORY'], // Ajouter un tag
      },
    ),
  }),
  overrideExisting: false,
});
// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  // Inventory
  useGetInventoryQuery,
} = inventoryApi;
