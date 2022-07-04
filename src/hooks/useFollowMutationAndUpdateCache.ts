import * as Apollo from "@apollo/client";
import {
  FollowMutation,
  FollowMutationVariables,
  RegularUserFragment,
  RegularUserFragmentDoc,
  useFollowMutation
} from "../generated/graphql";

export const useFollowMutationAndUpdateCache = (
  baseOptions?: Apollo.MutationHookOptions<
    FollowMutation,
    FollowMutationVariables
  >
) =>
  useFollowMutation({
    update: (cache, { data: followData }, { variables }) => {
      if (!followData?.follow) return;
      cache.updateFragment<RegularUserFragment>(
        {
          id: `User:${variables?.followId}`,
          fragment: RegularUserFragmentDoc
        },
        data => (data ? { ...data, amIFollowingThem: true } : null)
      );
    },
    refetchQueries: ["UserFeed"],
    ...baseOptions
  });
