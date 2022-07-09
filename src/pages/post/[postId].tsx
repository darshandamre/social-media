import { NextPage } from "next";
import { Layout } from "../../features/common";
import { PostPage } from "../../features/post";

const Post: NextPage = () => {
  return (
    <Layout>
      <PostPage />
    </Layout>
  );
};

export default Post;
