import { Typography } from "@mui/material";
import { useLikedPostsQuery } from "../../app/api";
import { Loader } from "../common";
import { PostCard } from "../post";

const LikesPage = () => {
  const { data, isLoading } = useLikedPostsQuery();

  if (isLoading) return <Loader />;

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
