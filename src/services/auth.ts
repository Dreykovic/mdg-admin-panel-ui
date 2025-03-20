import { User } from '@/types/entity';

import { apiSlice } from '.';

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    /**Auth */
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
  overrideExisting: false,
});
// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  /**Auth */
  useSignInMutation,
  useSignOutMutation,
} = authApi;
