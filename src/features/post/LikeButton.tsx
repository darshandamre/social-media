import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import { useDislikeMutation, useLikeMutation } from "../../app/api";
import { PostActionContainer } from "./PostActionContainer";

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
      <IconButton>{likeIcon}</IconButton>
      {likes ? <Typography variant="body2">{likes}</Typography> : null}
    </PostActionContainer>
  );
};

export { LikeButton };
