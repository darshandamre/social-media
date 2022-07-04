import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import {
  useLikeMutationAndUpdateCache,
  useDislikeMutationAndUpdateCache
} from "../../hooks";
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
  const [like, { loading: isLikeLoading }] =
    useLikeMutationAndUpdateCache(postId);
  const [dislike, { loading: isDislikeLoading }] =
    useDislikeMutationAndUpdateCache(postId);

  const likeIcon = isLiked ? (
    <Favorite fontSize="small" color="error" />
  ) : (
    <FavoriteBorder fontSize="small" />
  );

  return (
    <PostActionContainer>
      <IconButton
        onClick={e => {
          e.stopPropagation();
          if (isLikeLoading || isDislikeLoading) return;
          isLiked ? dislike() : like();
        }}>
        {likeIcon}
      </IconButton>
      {likes ? <Typography variant="body2">{likes}</Typography> : null}
    </PostActionContainer>
  );
};

export { LikeButton };
