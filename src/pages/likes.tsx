import { Typography } from "@mui/material";
import { NextPage } from "next";
import { Layout, Loader } from "../features/common";
import { PostCard } from "../features/post";
import { useLikedPostsQuery } from "../generated/graphql";

const Likes: NextPage = () => {
  const { data, loading } = useLikedPostsQuery();

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
        Likes
      </Typography>
      {data?.likedPosts?.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </Layout>
  );
};

export default Likes;
