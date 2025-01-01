import apiSlice from '@/store/api-slice';
import { User } from '@/types/entity';

const authApis = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (data: Partial<User>) => ({
        url: 'admin-auth/sign-in',
        method: 'POST',
        body: data,
      }),
    }),
    signOut: builder.mutation({
      query: (data: { token: string | null }) => ({
        url: 'admin-auth/sign-out',
        method: 'DELETE',
        body: data,
      }),
    }),
  }),
  overrideExisting: true,
});
// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useSignInMutation, useSignOutMutation } = authApis;
