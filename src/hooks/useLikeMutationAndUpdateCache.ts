import {
  LikedPostsDocument,
  LikedPostsQuery,
  LikeMutation,
  LikeMutationVariables,
  PostWithAuthorFieldFragment,
  PostWithAuthorFieldFragmentDoc,
  useLikeMutation
} from "../generated/graphql";
import * as Apollo from "@apollo/client";

export const useLikeMutationAndUpdateCache = (
  baseOptions?: Apollo.MutationHookOptions<LikeMutation, LikeMutationVariables>
) =>
  useLikeMutation({
    update(cache, { data: likeData }, { variables }) {
      if (!likeData?.like) return;
      const updatedPost = cache.updateFragment<PostWithAuthorFieldFragment>(
        {
          id: `Post:${variables?.postId}`,
          fragment: PostWithAuthorFieldFragmentDoc,
          fragmentName: "PostWithAuthorField"
        },
        data => {
          if (data) {
            return {
              ...data,
              isLikedByMe: true,
              likes: data.likes + 1
            };
          }
        }
      );
      if (!updatedPost) return;
      cache.updateQuery<LikedPostsQuery>(
        {
          query: LikedPostsDocument
        },
        data => ({
          __typename: "Query",
          likedPosts: [updatedPost, ...(data?.likedPosts ?? [])]
        })
      );
    },
    ...baseOptions
  });
