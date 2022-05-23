import { api as generatedApi } from "./generated/graphql";

export const enhancedApi = generatedApi.enhanceEndpoints({
  addTagTypes: ["Me", "Like", "Bookmark"],
  endpoints: {
    Me: {
      providesTags: ["Me"]
    },
    Register: {
      invalidatesTags: ["Me"]
    },
    Login: {
      invalidatesTags: ["Me"]
    },
    Logout: {
      invalidatesTags: ["Me"]
    },
    User: {
      providesTags: ["Like", "Bookmark"]
    },
    LikedPosts: {
      providesTags: ["Like", "Bookmark"]
    },
    BookmarkedPosts: {
      providesTags: ["Like", "Bookmark"]
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
                draft.user = {
                  ...draft.user,
                  ...user
                };
              }
            )
          );
        } catch (err) {
          console.error(err);
        }
      }
    },
    Like: {
      invalidatesTags: ["Like"],
      onQueryStarted: async ({ postId }, { dispatch, queryFulfilled }) => {
        const userFeedPatchResult = dispatch(
          enhancedApi.util.updateQueryData("UserFeed", undefined, draft => {
            const idx = draft.userFeed.findIndex(post => post.id === postId);
            if (idx > -1) {
              draft.userFeed[idx].isLikedByMe = true;
              draft.userFeed[idx].likes += 1;
            }
          })
        );

        const postsPatchResult = dispatch(
          enhancedApi.util.updateQueryData("Posts", undefined, draft => {
            const idx = draft.posts.findIndex(post => post.id === postId);
            if (idx > -1) {
              draft.posts[idx].isLikedByMe = true;
              draft.posts[idx].likes += 1;
            }
          })
        );

        try {
          await queryFulfilled;
        } catch {
          userFeedPatchResult.undo();
          postsPatchResult.undo();
        }
      }
    },
    Dislike: {
      invalidatesTags: ["Like"],
      onQueryStarted: async ({ postId }, { dispatch, queryFulfilled }) => {
        const userFeedPatchResult = dispatch(
          enhancedApi.util.updateQueryData("UserFeed", undefined, draft => {
            const idx = draft.userFeed.findIndex(post => post.id === postId);
            if (idx > -1) {
              draft.userFeed[idx].isLikedByMe = false;
              draft.userFeed[idx].likes -= 1;
            }
          })
        );

        const postsPatchResult = dispatch(
          enhancedApi.util.updateQueryData("Posts", undefined, draft => {
            const idx = draft.posts.findIndex(post => post.id === postId);
            if (idx > -1) {
              draft.posts[idx].isLikedByMe = false;
              draft.posts[idx].likes -= 1;
            }
          })
        );

        try {
          await queryFulfilled;
        } catch {
          userFeedPatchResult.undo();
          postsPatchResult.undo();
        }
      }
    },
    AddBookmark: {
      invalidatesTags: ["Bookmark"],
      onQueryStarted: async ({ postId }, { dispatch, queryFulfilled }) => {
        const userFeedPatchResult = dispatch(
          enhancedApi.util.updateQueryData("UserFeed", undefined, draft => {
            const idx = draft.userFeed.findIndex(post => post.id === postId);
            if (idx > -1) {
              draft.userFeed[idx].isBookmarkedByMe = true;
            }
          })
        );

        const postsPatchResult = dispatch(
          enhancedApi.util.updateQueryData("Posts", undefined, draft => {
            const idx = draft.posts.findIndex(post => post.id === postId);
            if (idx > -1) {
              draft.posts[idx].isBookmarkedByMe = true;
            }
          })
        );

        try {
          await queryFulfilled;
        } catch {
          userFeedPatchResult.undo();
          postsPatchResult.undo();
        }
      }
    },
    RemoveBookmark: {
      invalidatesTags: ["Bookmark"],
      onQueryStarted: async ({ postId }, { dispatch, queryFulfilled }) => {
        const userFeedPatchResult = dispatch(
          enhancedApi.util.updateQueryData("UserFeed", undefined, draft => {
            const idx = draft.userFeed.findIndex(post => post.id === postId);
            if (idx > -1) {
              draft.userFeed[idx].isBookmarkedByMe = false;
            }
          })
        );

        const postsPatchResult = dispatch(
          enhancedApi.util.updateQueryData("Posts", undefined, draft => {
            const idx = draft.posts.findIndex(post => post.id === postId);
            if (idx > -1) {
              draft.posts[idx].isBookmarkedByMe = false;
            }
          })
        );

        try {
          await queryFulfilled;
        } catch {
          userFeedPatchResult.undo();
          postsPatchResult.undo();
        }
      }
    }
  }
});
