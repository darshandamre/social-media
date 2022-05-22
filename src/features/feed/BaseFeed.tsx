import { Box, CircularProgress } from "@mui/material";
import { PostWithAuthorFieldFragment } from "../../app/api/generated/graphql";
import { CreatePost, PostCard } from "../post";

type BaseFeedProps = {
  isLoading?: boolean;
  posts?: PostWithAuthorFieldFragment[];
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
