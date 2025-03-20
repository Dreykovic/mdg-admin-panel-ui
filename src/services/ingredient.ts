import { ListResponse } from '@/types/api';
import { Ingredient } from '@/types/entity';

import { apiSlice } from '.';

const ingredientApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /**Ingredients */

    getIngredients: builder.query<
      ListResponse<Ingredient[]>,
      { filters?: string }
    >({
      query: (args) => {
        const { filters } = args;

        return {
          url: `catalog/recipe-catalog/ingredients/list`,
          params: { filters },
        };
      },
      providesTags: ['INGREDIENTS'], // Ajouter un tag
    }),
    createIngredient: builder.mutation({
      query: (data: Partial<Ingredient>) => ({
        url: 'catalog/recipe-catalog/ingredients/save',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['INGREDIENTS'], // Invalider les caches
    }),
    editIngredient: builder.mutation({
      query: (data: Ingredient) => ({
        url: `catalog/recipe-catalog/ingredients/update/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['INGREDIENTS'], // Invalider les caches
    }),
    deleteIngredient: builder.mutation({
      query: (data: { id: number }) => ({
        url: `catalog/recipe-catalog/ingredients/delete`,
        method: 'DELETE',
        body: data,
      }),
      invalidatesTags: ['INGREDIENTS'], // Invalider les caches
    }),
  }),
  overrideExisting: false,
});
// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  /**Ingredient */

  useCreateIngredientMutation,
  useEditIngredientMutation,
  useDeleteIngredientMutation,
  useGetIngredientsQuery,
} = ingredientApi;
