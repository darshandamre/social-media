import { Box, CircularProgress } from "@mui/material";
import { PostsQuery } from "../../app/api/generated/graphql";
import { CreatePost } from "../post/CreatePost";
import { PostCard } from "../post/PostCard";

type BaseFeedProps = {
  isLoading?: boolean;
  posts?: PostsQuery["posts"];
};

const BaseFeed = ({ isLoading, posts }: BaseFeedProps) => {
  return (
    <>
      {isLoading ? (
        <Box
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <>
          <CreatePost />
          {posts?.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </>
      )}
    </>
  );
};

export { BaseFeed };
