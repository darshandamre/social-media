import { Typography } from "@mui/material";
import { NextPage } from "next";
import { Layout, Loader } from "../features/common";
import { PostCard } from "../features/post";
import { useBookmarkedPostsQuery } from "../generated/graphql";

const Bookmarks: NextPage = () => {
  const { data, loading } = useBookmarkedPostsQuery();

  if (loading) return <Loader />;

  return (
    <Layout>
      <Typography
        variant="h5"
        sx={({ palette }) => ({
          px: 3,
          py: 2,
          borderBottom: `1px solid ${palette.background.paper}`
        })}>
        Bookmarks
      </Typography>
      {data?.bookmarkedPosts?.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </Layout>
  );
};

export default Bookmarks;
