import { NextPage } from "next";
import { BookmarksPage } from "../features/bookmarks";
import { Layout } from "../features/common";

const Bookmarks: NextPage = () => {
  return (
    <Layout>
      <BookmarksPage />
    </Layout>
  );
};

export default Bookmarks;
