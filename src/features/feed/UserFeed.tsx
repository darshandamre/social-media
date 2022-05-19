import { useUserFeedQuery } from "../../app/api";
import { BaseFeed } from "./BaseFeed";

const UserFeed = () => {
  const { data, isLoading } = useUserFeedQuery();

  return <BaseFeed isLoading={isLoading} posts={data?.userFeed} />;
};

export { UserFeed };
