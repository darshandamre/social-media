import { usePostsQuery } from "../../generated/graphql";
import { BaseFeed } from "./BaseFeed";

const ExploreFeed = () => {
  const { data, loading } = usePostsQuery();

  return <BaseFeed isLoading={loading} posts={data?.posts} />;
};

export { ExploreFeed };
