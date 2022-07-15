import {
  MeDocument,
  MeQuery,
  PostWithAuthorFieldFragment,
  PostWithAuthorFieldFragmentDoc,
  useCreatePostMutation,
  UserDocument,
  UserQuery,
  UserQueryVariables
} from "../generated/graphql";

export const useCreatePostMutationAndUpdateCache = () =>
  useCreatePostMutation({
    update(cache, { data }) {
      if (!data?.createPost) return;

      const user = cache.readQuery<MeQuery>({
        query: MeDocument
      });

      const newPost = cache.updateFragment<PostWithAuthorFieldFragment>(
        {
          id: `Post:${data.createPost.id}`,
          fragment: PostWithAuthorFieldFragmentDoc,
          fragmentName: "PostWithAuthorField"
        },
        () => ({
          ...data.createPost,
          likes: 0,
          isLikedByMe: false,
          isBookmarkedByMe: false,
          author: user?.me
        })
      );

      if (!newPost) return;

      cache.updateQuery<UserQuery, UserQueryVariables>(
        {
          query: UserDocument,
          variables: { username: user?.me?.username! }
        },
        userData => {
          if (!userData?.user) return;

          return {
            __typename: "Query",
            user: {
              ...userData.user,
              posts: [newPost, ...(userData?.user?.posts ?? [])]
            }
          };
        }
      );
    }
  });
