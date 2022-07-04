import * as Apollo from "@apollo/client";
import {
  RegularUserFragment,
  RegularUserFragmentDoc,
  UnfollowMutation,
  UnfollowMutationVariables,
  useUnfollowMutation
} from "../generated/graphql";

export const useUnFollowMutationAndUpdateCache = (
  baseOptions?: Apollo.MutationHookOptions<
    UnfollowMutation,
    UnfollowMutationVariables
  >
) =>
  useUnfollowMutation({
    update: (cache, { data: unfollowData }, { variables }) => {
      if (!unfollowData?.unfollow) return;
      cache.updateFragment<RegularUserFragment>(
        {
          id: `User:${variables?.unfollowId}`,
          fragment: RegularUserFragmentDoc
        },
        data => (data ? { ...data, amIFollowingThem: false } : null)
      );
    },
    refetchQueries: ["UserFeed"],
    ...baseOptions
  });
