import { NextPage } from "next";
import { Layout, Loader } from "../features/common";
import { BaseFeed } from "../features/feed";
import { useUserFeedQuery } from "../generated/graphql";
import { useIsAuth } from "../hooks/useIsAuth";

const Home: NextPage = () => {
  const { data, loading } = useUserFeedQuery();
  const { authLoading, isAuth } = useIsAuth();

  if (authLoading || !isAuth) return <Loader />;

  return (
    <Layout title="Home">
      <BaseFeed isLoading={loading} posts={data?.userFeed} />
    </Layout>
  );
};

export default Home;
