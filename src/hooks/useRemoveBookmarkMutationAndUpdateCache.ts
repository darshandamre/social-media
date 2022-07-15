import {
  BookmarkedPostsDocument,
  BookmarkedPostsQuery,
  PostWithAuthorFieldFragment,
  PostWithAuthorFieldFragmentDoc,
  RemoveBookmarkMutation,
  RemoveBookmarkMutationVariables,
  useRemoveBookmarkMutation
} from "../generated/graphql";
import * as Apollo from "@apollo/client";

export const useRemoveBookmarkMutationAndUpdateCache = (
  baseOptions?: Apollo.MutationHookOptions<
    RemoveBookmarkMutation,
    RemoveBookmarkMutationVariables
  >
) =>
  useRemoveBookmarkMutation({
    update(cache, { data: removeBookmarkData }, { variables }) {
      if (!removeBookmarkData?.removeBookmark) return;
      const updatedPost = cache.updateFragment<PostWithAuthorFieldFragment>(
        {
          id: `Post:${variables?.postId}`,
          fragment: PostWithAuthorFieldFragmentDoc,
          fragmentName: "PostWithAuthorField"
        },
        data => {
          if (data) {
            return { ...data, isBookmarkedByMe: false };
          }
        }
      );
      if (!updatedPost) return;
      cache.updateQuery<BookmarkedPostsQuery>(
        {
          query: BookmarkedPostsDocument
        },
        data => {
          if (!data?.bookmarkedPosts) return;

          return {
            __typename: "Query",
            bookmarkedPosts: data.bookmarkedPosts.filter(
              post => post.id !== variables?.postId
            )
          };
        }
      );
    },
    ...baseOptions
  });
