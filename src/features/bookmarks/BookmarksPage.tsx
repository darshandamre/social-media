import { Typography } from "@mui/material";
import { useBookmarkedPostsQuery } from "../../generated/graphql";
import { Loader } from "../common";
import { PostCard } from "../post";

const BookmarksPage = () => {
  const { data, loading } = useBookmarkedPostsQuery();

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
        Bookmarks
      </Typography>
      {data?.bookmarkedPosts?.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </>
  );
};

export { BookmarksPage };
