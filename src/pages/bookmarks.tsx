import { Typography } from "@mui/material";
import { NextPage } from "next";
import { Layout, Loader } from "../features/common";
import { PostCard } from "../features/post";
import { useBookmarkedPostsQuery } from "../generated/graphql";
import { useIsAuth } from "../hooks/useIsAuth";

const Bookmarks: NextPage = () => {
  const { data, loading: postLoading } = useBookmarkedPostsQuery();
  const { authLoading } = useIsAuth();

  if (authLoading) return <Loader />;

  return (
    <Layout>
      {postLoading ? (
        <Loader />
      ) : (
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
      )}
    </Layout>
  );
};

export default Bookmarks;
