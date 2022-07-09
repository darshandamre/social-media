import { NextPage } from "next";
import { Layout } from "../features/common";
import { ExploreFeed } from "../features/feed";

const Explore: NextPage = () => {
  return (
    <Layout>
      <ExploreFeed />
    </Layout>
  );
};

export default Explore;
