import { Typography } from "@mui/material";
import { useLikedPostsQuery } from "../../generated/graphql";
import { Loader } from "../common";
import { PostCard } from "../post";

const LikesPage = () => {
  const { data, loading } = useLikedPostsQuery();

  if (loading) return <Loader />;

  return (
    <>
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
    </>
  );
};

export { LikesPage };
