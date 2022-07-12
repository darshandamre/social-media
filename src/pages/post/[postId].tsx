import { ArrowBack, ChatBubbleOutline } from "@mui/icons-material";
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useRef } from "react";
import { CommentBox, CommentsList } from "../../features/comments";
import { Layout, Loader, NextLinkComposed } from "../../features/common";
import {
  BookmarkButton,
  LikeButton,
  PostActionContainer,
  PostCardOptions
} from "../../features/post";
import {
  PostDocument,
  PostQuery,
  PostQueryVariables,
  usePostQuery
} from "../../generated/graphql";
import { stringAvatar } from "../../utils";
import { addApolloState, initializeApollo } from "../../utils/apolloClient";

const PostPage: NextPage = () => {
  const router = useRouter();
  const commentRef = useRef<HTMLInputElement>(null);

  const postId =
    typeof router.query.postId === "string" ? router.query.postId : "skip";
  const { data: postData, loading: isPostLoading } = usePostQuery({
    skip: postId === "skip",
    variables: { postId }
  });

  let post = postData?.post;

  if (!post) {
    if (isPostLoading) {
      return <Loader />;
    } else {
      return (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100%">
          404 | post not found
        </Box>
      );
    }
  }

  const { author, content, likes, isLikedByMe, isBookmarkedByMe, createdAt } =
    post;
  const profileUrl = `/user/${author?.username}`;

  const date = new Date(Number(createdAt)).toLocaleTimeString([], {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  return (
    <Layout>
      <Typography
        variant="h5"
        sx={({ palette }) => ({
          py: 1,
          borderBottom: `1px solid ${palette.background.paper}`,
          display: "flex",
          alignItems: "center"
        })}>
        <IconButton
          onClick={() => router.back()}
          sx={{
            mx: 1
          }}>
          <ArrowBack />
        </IconButton>
        <span>Post</span>
      </Typography>

      <Box
        sx={{
          px: "1rem",
          pt: "0.75rem",
          pb: "0.25rem",
          display: "flex",
          alignItems: "start",
          position: "relative"
        }}>
        <Avatar
          component={NextLinkComposed}
          to={profileUrl}
          sx={{ textDecoration: "none", ...stringAvatar(author?.name)?.sx }}>
          {stringAvatar(author?.name)?.children}
        </Avatar>
        <Box mx="0.75rem" flexGrow={1}>
          {author?.name ? (
            <Typography
              component={NextLinkComposed}
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
            component={NextLinkComposed}
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
    </Layout>
  );
};

export default PostPage;

export const getServerSideProps: GetServerSideProps = async ctx => {
  if (typeof ctx.query.postId !== "string") {
    return { notFound: true };
  }

  const apolloClient = initializeApollo({ cookies: ctx.req.cookies });
  const { data } = await apolloClient.query<PostQuery, PostQueryVariables>({
    query: PostDocument,
    variables: { postId: ctx.query.postId }
  });

  if (!data.post) {
    return { notFound: true };
  }

  return addApolloState(apolloClient, {
    props: {}
  });
};
