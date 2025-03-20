import { ListResponse } from '@/types/api';
import { Step } from '@/types/entity';

import { apiSlice } from '.';

const stepApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /**Step */

    getSteps: builder.query<ListResponse<Step[]>, { filters?: string }>({
      query: (args) => {
        const { filters } = args;

        return {
          url: `catalog/recipe-catalog/steps/list`,
          params: { filters },
        };
      },
      providesTags: ['STEPS'], // Ajouter un tag
    }),
    createStep: builder.mutation({
      query: (data: Partial<Step>) => ({
        url: 'catalog/recipe-catalog/steps/save',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['STEPS'], // Invalider les caches
    }),
    editStep: builder.mutation({
      query: (data: Step) => ({
        url: `catalog/recipe-catalog/steps/update/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['STEPS'], // Invalider les caches
    }),
    deleteStep: builder.mutation({
      query: (data: { id: number }) => ({
        url: `catalog/recipe-catalog/steps/delete`,
        method: 'DELETE',
        body: data,
      }),
      invalidatesTags: ['STEPS'], // Invalider les caches
    }),
  }),
  overrideExisting: false,
});
// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  /**Steps */

  useCreateStepMutation,
  useEditStepMutation,
  useDeleteStepMutation,
  useGetStepsQuery,
} = stepApi;
