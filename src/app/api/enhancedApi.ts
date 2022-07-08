import { api as generatedApi } from "./baseApi";

export const enhancedApi = generatedApi.enhanceEndpoints({
  addTagTypes: ["User", "Post"],
  endpoints: {
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
    }
  }
});
