import { NextPage } from "next";
import { Layout } from "../features/common";
import { UserFeed } from "../features/feed";

const Home: NextPage = () => {
  return (
    <Layout>
      <UserFeed />
    </Layout>
  );
};

export default Home;
