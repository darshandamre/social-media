import { Avatar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { useCommentsQuery } from "../../app/api";
import { PostWithAuthorFieldFragment } from "../../app/api/generated/graphql";
import { stringAvatar } from "../../utils/stringAvatar";

type CommentsListProps = {
  post: PostWithAuthorFieldFragment;
};

const CommentsList = ({ post }: CommentsListProps) => {
  const { data } = useCommentsQuery({ postId: post.id });

  return (
    <Box
      sx={theme => ({
        borderTop: `1px solid ${theme.palette.background.paper}`
      })}>
      {data?.comments.map(({ id, content, author }) => {
        const profileUrl = `/u/${author?.username}`;
        return (
          <Box
            key={id}
            p={2}
            display="flex"
            alignItems="start"
            sx={theme => ({
              borderBottom: `1px solid ${theme.palette.background.paper}`
            })}>
            <Avatar
              component={Link}
              to={profileUrl}
              sx={{
                textDecoration: "none",
                ...stringAvatar(author?.name)?.sx
              }}>
              {stringAvatar(author?.name)?.children}
            </Avatar>
            <Box mx={2}>
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
              <Typography fontSize="0.95rem" color="InactiveCaptionText">
                replying to @{post.author?.username}
              </Typography>
              <Typography>{content}</Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export { CommentsList };
