import {
  DislikeMutation,
  DislikeMutationVariables,
  LikedPostsDocument,
  LikedPostsQuery,
  PostWithAuthorFieldFragment,
  PostWithAuthorFieldFragmentDoc,
  useDislikeMutation
} from "../generated/graphql";
import * as Apollo from "@apollo/client";

export const useDislikeMutationAndUpdateCache = (
  postId: PostWithAuthorFieldFragment["id"],
  baseOptions?: Apollo.MutationHookOptions<
    DislikeMutation,
    DislikeMutationVariables
  >
) =>
  useDislikeMutation({
    update(cache, { data: dislikeData }) {
      if (!dislikeData?.dislike) return;
      cache.updateFragment<PostWithAuthorFieldFragment>(
        {
          id: `Post:${postId}`,
          fragment: PostWithAuthorFieldFragmentDoc,
          fragmentName: "PostWithAuthorField"
        },
        data => {
          if (data) {
            return {
              ...data,
              isLikedByMe: false,
              likes: data.likes - 1
            };
          }
        }
      );

      cache.updateQuery<LikedPostsQuery>(
        {
          query: LikedPostsDocument
        },
        data => ({
          __typename: "Query",
          likedPosts: data?.likedPosts?.filter(post => post.id !== postId)
        })
      );
    },
    ...baseOptions
  });
