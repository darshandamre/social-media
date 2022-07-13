import { NextPage } from "next";
import { Layout } from "../features/common";
import { BaseFeed } from "../features/feed";
import { usePostsQuery } from "../generated/graphql";

const Explore: NextPage = () => {
  const { data, loading } = usePostsQuery();

  return (
    <Layout>
      <BaseFeed isLoading={loading} posts={data?.posts} />
    </Layout>
  );
};

export default Explore;
