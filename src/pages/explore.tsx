import { NextPage } from "next";
import { Layout, Loader } from "../features/common";
import { BaseFeed } from "../features/feed";
import { usePostsQuery } from "../generated/graphql";
import { useIsAuth } from "../hooks/useIsAuth";

const Explore: NextPage = () => {
  const { data, loading } = usePostsQuery();
  const { authLoading, isAuth } = useIsAuth();

  if (authLoading || !isAuth) return <Loader />;

  return (
    <Layout>
      <BaseFeed isLoading={loading} posts={data?.posts} />
    </Layout>
  );
};

export default Explore;
