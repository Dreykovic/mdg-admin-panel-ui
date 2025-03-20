import { ListResponse } from '@/types/api';
import { Recipe } from '@/types/entity';

import { apiSlice } from '.';

const recipeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /**Recipes */

    getUniqueRecipe: builder.query<ListResponse<Recipe>, { recipeId: number }>({
      query: (args) => {
        const { recipeId } = args;

        return {
          url: `catalog/recipe-catalog/recipes/details/${recipeId}`,
        };
      },
      providesTags: ['RECIPES'], // Ajouter un tag
    }),
    createRecipe: builder.mutation({
      query: (data: Partial<Recipe>) => ({
        url: 'catalog/recipe-catalog/recipes/save',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['RECIPES'], // Invalider les caches
    }),
    editRecipe: builder.mutation({
      query: (data: Recipe) => ({
        url: `catalog/recipe-catalog/recipes/update/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['RECIPES'], // Invalider les caches
    }),
    deleteRecipe: builder.mutation({
      query: (data: { id: number }) => ({
        url: `catalog/recipe-catalog/recipes/delete`,
        method: 'DELETE',
        body: data,
      }),
      invalidatesTags: ['RECIPES'], // Invalider les caches
    }),
  }),
  overrideExisting: false,
});
// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  /**Recipes */

  useCreateRecipeMutation,
  useEditRecipeMutation,
  useDeleteRecipeMutation,
  useGetUniqueRecipeQuery,
} = recipeApi;
