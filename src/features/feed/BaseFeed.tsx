import { Box, CircularProgress } from "@mui/material";
import { PostsQuery } from "../../app/api/generated/graphql";
import { PostCard } from "../common/PostCard";

type BaseFeedProps = {
  isLoading?: boolean;
  posts?: PostsQuery["posts"];
};

const BaseFeed = ({ isLoading, posts }: BaseFeedProps) => {
  return (
    <Box height="100%">
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
        posts?.map(post => <PostCard key={post.id} post={post} />)
      )}
    </Box>
  );
};

export { BaseFeed };
