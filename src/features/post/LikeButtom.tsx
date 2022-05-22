import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { useDislikeMutation, useLikeMutation } from "../../app/api";
import { PostActionContainer } from "./PostCard";

const LikeButton = ({
  likes,
  isLiked,
  postId
}: {
  likes: number;
  isLiked: boolean;
  postId: string;
}) => {
  const [like] = useLikeMutation();
  const [dislike] = useDislikeMutation();

  const likeIcon = isLiked ? (
    <Favorite fontSize="small" color="error" />
  ) : (
    <FavoriteBorder fontSize="small" />
  );

  return (
    <PostActionContainer
      onClick={() => {
        isLiked ? dislike({ postId }) : like({ postId });
      }}>
      {likeIcon}
      {likes === 0 ? null : (
        <Typography variant="body2" mx="0.5rem">
          {likes}
        </Typography>
      )}
    </PostActionContainer>
  );
};

export { LikeButton };
