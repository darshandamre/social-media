import { ChatBubbleOutline } from "@mui/icons-material";
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import { useRouter } from "next/router";
import type { PostWithAuthorFieldFragment } from "../../generated/graphql";
import { stringAvatar } from "../../utils/stringAvatar";
import { NextLinkComposed } from "../common";
import { BookmarkButton } from "./BookmarkButton";
import { LikeButton } from "./LikeButton";
import { PostActionContainer } from "./PostActionContainer";
import { PostCardOptions } from "./PostCardOptions";

interface PostCardProps {
  post: PostWithAuthorFieldFragment;
}

const PostCard = ({ post }: PostCardProps) => {
  const { id, content, author, likes, isLikedByMe, isBookmarkedByMe } = post;
  const profileUrl = `/user/${author?.username}`;
  const postPageUrl = `/post/${id}`;
  const router = useRouter();

  return (
    <Box
      onClick={() => router.push(postPageUrl)}
      tabIndex={0}
      sx={({ palette }) => ({
        px: "1rem",
        pt: "0.75rem",
        pb: "0.25rem",
        display: "flex",
        alignItems: "start",
        position: "relative",
        cursor: "pointer",
        borderBottom: `1px solid ${palette.background.paper}`
      })}>
      <Box onClick={e => e.stopPropagation()}>
        <Avatar
          component={NextLinkComposed}
          to={profileUrl}
          sx={{ textDecoration: "none", ...stringAvatar(author?.name)?.sx }}>
          {stringAvatar(author?.name)?.children}
        </Avatar>
      </Box>
      <Box mx="0.75rem" flexGrow={1}>
        <Box display="flex" onClick={e => e.stopPropagation()}>
          {author?.name ? (
            <Typography
              component={NextLinkComposed}
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
            component={NextLinkComposed}
            to={profileUrl}
            color="InactiveCaptionText"
            sx={{ textDecoration: "none" }}>
            @{author?.username}
          </Typography>
        </Box>
        <Typography whiteSpace="pre-line">{content}</Typography>
        <Box display="flex" justifyContent="space-around">
          <PostActionContainer>
            <IconButton
              onClick={e => {
                e.stopPropagation();
                router.push(`${postPageUrl}?fc=true`);
              }}>
              <ChatBubbleOutline fontSize="small" />
            </IconButton>
          </PostActionContainer>

          <LikeButton likes={likes} isLiked={isLikedByMe} postId={post.id} />
          <BookmarkButton
            isBookmarkedByMe={isBookmarkedByMe}
            postId={post.id}
          />
        </Box>
      </Box>

      <PostCardOptions post={post} />
    </Box>
  );
};

export { PostCard };
