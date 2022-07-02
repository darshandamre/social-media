import { api } from "../../app/api/baseApi";
import { MeQuery } from "../../generated/graphql";

api.enhanceEndpoints({
  addTagTypes: ["Comment"],
  endpoints: {
    Comments: {
      providesTags: result =>
        result ? result.comments.map(({ id }) => ({ type: "Comment", id })) : []
    },
    CreateComment: {
      onQueryStarted: async (
        { postId },
        { dispatch, queryFulfilled, getState }
      ) => {
        try {
          const { data } = await queryFulfilled;

          const { me } = getState().api.queries["Me(undefined)"]
            ?.data as MeQuery;

          dispatch(
            api.util.updateQueryData("Comments", { postId }, draft => {
              draft.comments.unshift({
                ...data.createComment,
                author: me
              });
            })
          );
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
});
