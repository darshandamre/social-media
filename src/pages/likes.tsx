import { Typography } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Layout, Loader } from "../features/common";
import { PostCard } from "../features/post";
import { useLikedPostsQuery, useMeQuery } from "../generated/graphql";

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
