import { enhancedApi } from "./enhancedApi";

export { enhancedApi as api };
export const {
  useHelloQuery,
  useLazyHelloQuery,
  useMeQuery,
  useLazyMeQuery,
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUserFeedQuery,
  useLazyUserFeedQuery,
  usePostQuery,
  useLazyPostQuery,
  usePostsQuery,
  useLazyPostsQuery,
  useCreatePostMutation,
  useEditPostMutation,
  useDeletePostMutation,
  useLikeMutation,
  useDislikeMutation,
  useAddBookmarkMutation,
  useRemoveBookmarkMutation,
  useLikedPostsQuery,
  useLazyLikedPostsQuery,
  useBookmarkedPostsQuery,
  useLazyBookmarkedPostsQuery,
  useUserQuery,
  useLazyUserQuery,
  useEditUserMutation
} = enhancedApi;
