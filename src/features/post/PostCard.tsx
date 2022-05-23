import { ChatBubbleOutline, MoreHoriz } from "@mui/icons-material";
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
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
  const profileUrl = `/u/${author?.username}`;

  return (
    <Box
      sx={{
        px: "1rem",
        pt: "0.75rem",
        pb: "0.25rem",
        display: "flex",
        borderBottom: `1px solid ${theme.palette.background.paper}`
      }}>
      <Avatar
        component={Link}
        to={profileUrl}
        sx={{ textDecoration: "none", ...stringAvatar(author?.name)?.sx }}>
        {stringAvatar(author?.name)?.children}
      </Avatar>
      <Box mx="0.75rem" flexGrow={1}>
        <Box display="flex">
          {author?.name ? (
            <Typography
              component={Link}
              to={profileUrl}
              sx={{
                mr: "0.5rem",
                color: "inherit",
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" }
              }}>
              {author.name}
            </Typography>
          ) : null}
          <Typography
            component={Link}
            to={profileUrl}
            color="InactiveCaptionText"
            sx={{ textDecoration: "none" }}>
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
