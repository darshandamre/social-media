import { NextPage } from "next";
import { Layout } from "../features/common";
import { BaseFeed } from "../features/feed";
import { useUserFeedQuery } from "../generated/graphql";

const Home: NextPage = () => {
  const { data, loading } = useUserFeedQuery();

  return (
    <Layout>
      <BaseFeed isLoading={loading} posts={data?.userFeed} />;
    </Layout>
  );
};

export default Home;
