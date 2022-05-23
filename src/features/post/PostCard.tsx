import { ChatBubbleOutline, MoreHoriz } from "@mui/icons-material";
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import { PostWithAuthorFieldFragment } from "../../app/api/generated/graphql";
import { theme } from "../../theme";
import { stringAvatar } from "../../utils/stringAvatar";
import { BookmarkButton } from "./BookmarkButton";
import { LikeButton } from "./LikeButton";
import { PostActionContainer } from "./PostActionContainer";

interface PostCardProps {
  post: PostWithAuthorFieldFragment;
}

const PostCard = ({ post }: PostCardProps) => {
  const { content, author, likes, isLikedByMe, isBookmarkedByMe } = post;

  return (
    <Box
      sx={{
        px: "1rem",
        pt: "0.75rem",
        pb: "0.25rem",
        display: "flex",
        borderBottom: `1px solid ${theme.palette.background.paper}`
      }}>
      <Avatar {...stringAvatar(author?.name)} />
      <Box mx="0.75rem" flexGrow={1}>
        <Box display="flex">
          {author?.name ? (
            <Typography mr="0.5rem">{author.name}</Typography>
          ) : null}
          <Typography component="span" color="InactiveCaptionText">
            @{author?.username}
          </Typography>
        </Box>
        <Typography>{content}</Typography>
        <Box display="flex" justifyContent="space-around">
          <PostActionContainer>
            <IconButton>
              <ChatBubbleOutline fontSize="small" />
            </IconButton>
            {/* <Typography variant="body2" mx="0.5rem">
              4
            </Typography> */}
          </PostActionContainer>

          <LikeButton likes={likes} isLiked={isLikedByMe} postId={post.id} />
          <BookmarkButton
            isBookmarkedByMe={isBookmarkedByMe}
            postId={post.id}
          />
        </Box>
      </Box>
      <MoreHoriz color="disabled" />
    </Box>
  );
};

export { PostCard };
