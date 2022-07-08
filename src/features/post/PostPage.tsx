import { ArrowBack, ChatBubbleOutline } from "@mui/icons-material";
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import { useRef } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Post,
  PostWithAuthorFieldFragment,
  usePostQuery
} from "../../generated/graphql";
import { isObjectWithKey } from "../../utils/isObjectWithKey";
import { stringAvatar } from "../../utils/stringAvatar";
import { CommentBox } from "../comments/CommentBox";
import { CommentsList } from "../comments/CommentsList";
import { Loader } from "../common";
import { BookmarkButton } from "./BookmarkButton";
import { LikeButton } from "./LikeButton";
import { PostActionContainer } from "./PostActionContainer";
import { PostCardOptions } from "./PostCardOptions";

type PostParams = {
  postId: string;
};

const PostPage = () => {
  const { postId } = useParams<PostParams>();
  const navigate = useNavigate();
  const commentRef = useRef<HTMLInputElement>(null);

  const { data: postData, loading: isPostLoading } = usePostQuery({
    variables: {
      postId: postId!
    }
  });
  const { state } = useLocation();

  let post: PostWithAuthorFieldFragment | undefined | null;
  if (
    isPostLoading &&
    isObjectWithKey(state, "post") &&
    isObjectWithKey(state.post, "id") &&
    postId === state.post.id
  ) {
    post = state.post as PostWithAuthorFieldFragment;
  } else {
    post = postData?.post;
  }

  const date = new Date(Number(post?.createdAt)).toLocaleTimeString([], {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  if (!post) {
    if (isPostLoading) {
      return <Loader />;
    } else {
      return <div>post not found</div>;
    }
  }

  const { author, content, likes, isLikedByMe, isBookmarkedByMe } = post;
  const profileUrl = `/u/${author?.username}`;

  return (
    <>
      <Typography
        variant="h5"
        sx={({ palette }) => ({
          py: 1,
          borderBottom: `1px solid ${palette.background.paper}`,
          display: "flex",
          alignItems: "center"
        })}>
        <IconButton
          onClick={() => navigate(-1)}
          sx={{
            mx: 1
          }}>
          <ArrowBack />
        </IconButton>
        <span>Post</span>
      </Typography>

      <Box
        sx={theme => ({
          px: "1rem",
          pt: "0.75rem",
          pb: "0.25rem",
          display: "flex",
          alignItems: "start",
          position: "relative"
        })}>
        <Avatar
          component={Link}
          to={profileUrl}
          sx={{ textDecoration: "none", ...stringAvatar(author?.name)?.sx }}>
          {stringAvatar(author?.name)?.children}
        </Avatar>
        <Box mx="0.75rem" flexGrow={1}>
          {author?.name ? (
            <Typography
              component={Link}
              to={profileUrl}
              sx={{
                mr: "0.5rem",
                color: "inherit",
                textDecoration: "none",
                display: "block",
                "&:hover": { textDecoration: "underline" }
              }}>
              {author.name}
            </Typography>
          ) : null}
          <Typography
            component={Link}
            to={profileUrl}
            color="InactiveCaptionText"
            lineHeight={1}
            display="block"
            sx={{ textDecoration: "none" }}>
            @{author?.username}
          </Typography>
        </Box>

        <PostCardOptions post={post} />
      </Box>

      <Typography
        m={2}
        fontSize="1.5rem"
        lineHeight={1.3}
        whiteSpace="pre-line">
        {content}
      </Typography>

      <Box m={2}>{date}</Box>

      <Box
        mx={2}
        py={1}
        display="flex"
        justifyContent="space-around"
        sx={theme => ({
          borderBlock: `1px solid ${theme.palette.background.paper}`
        })}>
        <PostActionContainer>
          <IconButton onClick={() => commentRef.current?.focus()}>
            <ChatBubbleOutline fontSize="small" />
          </IconButton>
        </PostActionContainer>

        <LikeButton likes={likes} isLiked={isLikedByMe} postId={post.id} />
        <BookmarkButton isBookmarkedByMe={isBookmarkedByMe} postId={post.id} />
      </Box>
      <CommentBox post={post} commentRef={commentRef} />
      <CommentsList post={post} />
    </>
  );
};

export { PostPage };
