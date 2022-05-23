import { Typography } from "@mui/material";
import { useBookmarkedPostsQuery } from "../../app/api";
import { Loader } from "../common";
import { PostCard } from "../post";

const BookmarksPage = () => {
  const { data, isLoading } = useBookmarkedPostsQuery();

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
        Bookmarks
      </Typography>
      {data?.bookmarkedPosts?.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </>
  );
};

export { BookmarksPage };
