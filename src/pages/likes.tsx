import { NextPage } from "next";
import { Layout } from "../features/common";
import { LikesPage } from "../features/likes";

const Likes: NextPage = () => {
  return (
    <Layout>
      <LikesPage />
    </Layout>
  );
};

export default Likes;
