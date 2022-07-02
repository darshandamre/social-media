import { useUserFeedQuery } from "../../generated/graphql";
import { BaseFeed } from "./BaseFeed";

const UserFeed = () => {
  const { data, loading } = useUserFeedQuery();

  return <BaseFeed isLoading={loading} posts={data?.userFeed} />;
};

export { UserFeed };
