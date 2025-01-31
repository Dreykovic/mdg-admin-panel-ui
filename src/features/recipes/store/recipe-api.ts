import apiSlice from '@/store/api-slice';
import { ListResponse, PaginationResponse } from '@/types/api';
import { Recipe } from '@/types/entity';

const appApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSomeRecipes: builder.query<
      PaginationResponse<Recipe[]>,
      { page?: number; filters?: string; pageSize?: number }
    >({
      query: (args) => {
        const { page, filters, pageSize } = args;

        return {
          url: `resources/recipe-resources/recipes`,
          params: { page, filters, pageSize },
        };
      },
      providesTags: ['RECIPES'], // Ajouter un tag
    }),
    getUniqueRecipe: builder.query<ListResponse<Recipe>, { recipeId: number }>({
      query: (args) => {
        const { recipeId } = args;

        return {
          url: `resources/recipe-resources/recipes/details/${recipeId}`,
        };
      },
      providesTags: ['RECIPES'], // Ajouter un tag
    }),
    createRecipe: builder.mutation({
      query: (data: Partial<Recipe>) => ({
        url: 'resources/recipe-resources/recipes/save',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['RECIPES'], // Invalider les caches
    }),
    editRecipe: builder.mutation({
      query: (data: Recipe) => ({
        url: `resources/recipe-resources/recipes/update/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['RECIPES'], // Invalider les caches
    }),
    deleteRecipe: builder.mutation({
      query: (data: { id: number }) => ({
        url: `resources/recipe-resources/recipes/delete`,
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
  useGetSomeRecipesQuery,
  useCreateRecipeMutation,
  useEditRecipeMutation,
  useDeleteRecipeMutation,
  useGetUniqueRecipeQuery,
} = appApi;
