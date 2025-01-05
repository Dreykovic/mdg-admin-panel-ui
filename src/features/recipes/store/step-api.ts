import apiSlice from '@/store/api-slice';
import { ListResponse, PaginationResponse } from '@/types/api';
import { Step } from '@/types/entity';

const appApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSomeSteps: builder.query<
      PaginationResponse<Step[]>,
      { page?: number; filters?: string; pageSize?: number }
    >({
      query: (args) => {
        const { page, filters, pageSize } = args;

        return {
          url: `resources/recipe-resources/steps`,
          params: { page, filters, pageSize },
        };
      },
      providesTags: ['STEPS'], // Ajouter un tag
    }),
    getSteps: builder.query<ListResponse<Step[]>, { filters?: string }>({
      query: (args) => {
        const { filters } = args;

        return {
          url: `resources/recipe-resources/steps/list`,
          params: { filters },
        };
      },
      providesTags: ['STEPS'], // Ajouter un tag
    }),
    createStep: builder.mutation({
      query: (data: Partial<Step>) => ({
        url: 'resources/recipe-resources/steps/save',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['STEPS'], // Invalider les caches
    }),
    editStep: builder.mutation({
      query: (data: Step) => ({
        url: `resources/recipe-resources/steps/update/${data.id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['STEPS'], // Invalider les caches
    }),
    deleteStep: builder.mutation({
      query: (data: { id: number }) => ({
        url: `resources/recipe-resources/steps/delete`,
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
  useGetSomeStepsQuery,
  useCreateStepMutation,
  useEditStepMutation,
  useDeleteStepMutation,
  useGetStepsQuery,
} = appApi;
