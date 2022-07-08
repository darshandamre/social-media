import {
  AddBookmarkMutation,
  AddBookmarkMutationVariables,
  BookmarkedPostsDocument,
  BookmarkedPostsQuery,
  PostWithAuthorFieldFragment,
  PostWithAuthorFieldFragmentDoc,
  useAddBookmarkMutation
} from "../generated/graphql";
import * as Apollo from "@apollo/client";

export const useAddBookmarkMutationAndUpdateCache = (
  baseOptions?: Apollo.MutationHookOptions<
    AddBookmarkMutation,
    AddBookmarkMutationVariables
  >
) =>
  useAddBookmarkMutation({
    update(cache, { data: addBookmarkData }, { variables }) {
      if (!addBookmarkData?.addBookmark) return;
      const updatedPost = cache.updateFragment<PostWithAuthorFieldFragment>(
        {
          id: `Post:${variables?.postId}`,
          fragment: PostWithAuthorFieldFragmentDoc,
          fragmentName: "PostWithAuthorField"
        },
        data => {
          if (data) {
            return { ...data, isBookmarkedByMe: true };
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
            bookmarkedPosts: [updatedPost, ...data.bookmarkedPosts]
          };
        }
      );
    },
    ...baseOptions
  });
