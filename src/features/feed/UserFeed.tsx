import { Box, CircularProgress } from "@mui/material";
import { useUserFeedQuery } from "../../app/api";
import { PostCard } from "../common/PostCard";

const UserFeed = () => {
  const { data, isLoading } = useUserFeedQuery();

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
        data?.userFeed.map(post => <PostCard key={post.id} post={post} />)
      )}
    </Box>
  );
};

export { UserFeed };
