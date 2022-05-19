import { usePostsQuery } from "../../app/api";
import { BaseFeed } from "./BaseFeed";

const ExploreFeed = () => {
  const { data, isLoading } = usePostsQuery();

  return <BaseFeed isLoading={isLoading} posts={data?.posts} />;
};

export { ExploreFeed };
