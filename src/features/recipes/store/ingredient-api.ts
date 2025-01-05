import apiSlice from '@/store/api-slice';
import { ListResponse, PaginationResponse } from '@/types/api';
import { Ingredient } from '@/types/entity';

const appApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSomeIngredients: builder.query<
      PaginationResponse<Ingredient[]>,
      { page?: number; filters?: string; pageSize?: number }
    >({
      query: (args) => {
        const { page, filters, pageSize } = args;

        return {
          url: `resources/recipe-resources/ingredients`,
          params: { page, filters, pageSize },
        };
      },
      providesTags: ['INGREDIENTS'], // Ajouter un tag
    }),
    getIngredients: builder.query<
      ListResponse<Ingredient[]>,
      { filters?: string }
    >({
      query: (args) => {
        const { filters } = args;

        return {
          url: `resources/recipe-resources/ingredients/list`,
          params: { filters },
        };
      },
      providesTags: ['INGREDIENTS'], // Ajouter un tag
    }),
    createIngredient: builder.mutation({
      query: (data: Partial<Ingredient>) => ({
        url: 'resources/recipe-resources/ingredients/save',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['INGREDIENTS'], // Invalider les caches
    }),
    editIngredient: builder.mutation({
      query: (data: Ingredient) => ({
        url: `resources/recipe-resources/ingredients/update/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['INGREDIENTS'], // Invalider les caches
    }),
    deleteIngredient: builder.mutation({
      query: (data: { id: number }) => ({
        url: `resources/recipe-resources/ingredients/delete`,
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
  useGetSomeIngredientsQuery,
  useCreateIngredientMutation,
  useEditIngredientMutation,
  useDeleteIngredientMutation,
  useGetIngredientsQuery,
} = appApi;
