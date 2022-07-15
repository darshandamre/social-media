import { Typography } from "@mui/material";
import { NextPage } from "next";
import { Layout, Loader } from "../features/common";
import { PostCard } from "../features/post";
import { useLikedPostsQuery } from "../generated/graphql";
import { useIsAuth } from "../hooks/useIsAuth";

const Likes: NextPage = () => {
  const { data, loading: postLoading } = useLikedPostsQuery();
  const { authLoading, isAuth } = useIsAuth();

  if (authLoading || !isAuth) return <Loader />;

  return (
    <Layout title="Likes">
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
            Likes
          </Typography>
          {data?.likedPosts?.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </>
      )}
    </Layout>
  );
};

export default Likes;
