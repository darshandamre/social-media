import { api as generatedApi } from "./baseApi";

export const enhancedApi = generatedApi.enhanceEndpoints({
  addTagTypes: ["User", "Post", "UserFeed"],
  endpoints: {
    Follow: {
      invalidatesTags: (result, _, { followId }) =>
        result?.follow ? [{ type: "User", id: followId }, "UserFeed"] : [],
      onQueryStarted: async ({ followId }, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          if (!data.follow) return;

          dispatch(
            enhancedApi.util.updateQueryData("Posts", undefined, draft => {
              draft.posts.forEach(post => {
                if (post.authorId === followId && post.author) {
                  post.author.amIFollowingThem = true;
                }
              });
            })
          );
        } catch (err) {
          console.error(err);
        }
      }
    },
    Unfollow: {
      invalidatesTags: (result, _, { unfollowId }) =>
        result?.unfollow ? [{ type: "User", id: unfollowId }] : [],
      onQueryStarted: async ({ unfollowId }, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          if (!data.unfollow) return;

          dispatch(
            enhancedApi.util.updateQueryData("UserFeed", undefined, draft => {
              draft.userFeed = draft.userFeed.filter(
                post => post.authorId !== unfollowId
              );
            })
          );

          dispatch(
            enhancedApi.util.updateQueryData("Posts", undefined, draft => {
              draft.posts.forEach(post => {
                if (post.authorId === unfollowId && post.author) {
                  post.author.amIFollowingThem = false;
                }
              });
            })
          );
        } catch (err) {
          console.error(err);
        }
      }
    },
    CreatePost: {
      invalidatesTags: result =>
        result?.createPost.authorId
          ? [
              {
                type: "User",
                id: result.createPost.authorId
              }
            ]
          : []
    },
    EditPost: {
      invalidatesTags: result =>
        result?.editPost ? [{ type: "Post", id: result.editPost.id }] : [],
      onQueryStarted: async ({ postId }, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          if (!data.editPost) return;

          dispatch(
            enhancedApi.util.updateQueryData("Posts", undefined, draft => {
              const idx = draft.posts.findIndex(p => p.id === postId);
              if (idx > -1) {
                draft.posts[idx] = { ...draft.posts[idx], ...data.editPost };
              }
            })
          );

          dispatch(
            enhancedApi.util.updateQueryData("UserFeed", undefined, draft => {
              const idx = draft.userFeed.findIndex(p => p.id === postId);
              if (idx > -1) {
                draft.userFeed[idx] = {
                  ...draft.userFeed[idx],
                  ...data.editPost
                };
              }
            })
          );
        } catch (err) {
          console.error(err);
        }
      }
    },
    DeletePost: {
      invalidatesTags: (result, _, { postId }) =>
        result?.deletePost ? [{ type: "Post", id: postId }] : [],
      onQueryStarted: async ({ postId }, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          if (!data.deletePost) return;

          dispatch(
            enhancedApi.util.updateQueryData("Posts", undefined, draft => {
              draft.posts = draft.posts.filter(p => p.id !== postId);
            })
          );

          dispatch(
            enhancedApi.util.updateQueryData("UserFeed", undefined, draft => {
              draft.userFeed = draft.userFeed.filter(p => p.id !== postId);
            })
          );
        } catch (err) {
          console.error(err);
        }
      }
    },

    EditUser: {
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const {
            data: {
              editUser: { user }
            }
          } = await queryFulfilled;

          if (!user) return;
          dispatch(
            enhancedApi.util.updateQueryData(
              "User",
              { username: user.username },
              draft => {
                if (!draft.user) return;
                draft.user = {
                  ...draft.user,
                  ...user
                };
              }
            )
          );
          dispatch(
            enhancedApi.util.updateQueryData("Me", undefined, draft => {
              if (!draft.me) return;
              draft.me.id = user.id;
              draft.me.username = user.username;
              draft.me.name = user.name;
            })
          );
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
});
