import {
  BookmarkAddOutlined,
  ChatBubbleOutlineOutlined,
  FavoriteBorder,
  MoreHoriz
} from "@mui/icons-material";
import { Avatar, Box, BoxProps, styled, Typography } from "@mui/material";
import { UserFeedQuery } from "../../app/api/generated/graphql";
import { theme } from "../../theme";
import { stringAvatar } from "../../utils/stringAvatar";

const PostActionContainer = styled(Box)<BoxProps>({
  display: "flex",
  alignItems: "center",
  cursor: "pointer"
});

interface PostCardProps {
  post: UserFeedQuery["userFeed"][number];
}

const PostCard = ({ post }: PostCardProps) => {
  const { content, author } = post;

  return (
    <Box
      sx={{
        px: "1rem",
        py: "0.75em",
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
        <Box mt="0.5rem" display="flex" justifyContent="space-around">
          <PostActionContainer>
            <ChatBubbleOutlineOutlined fontSize="small" />
            <Typography variant="body2" mx="0.5rem">
              4
            </Typography>
          </PostActionContainer>
          <PostActionContainer>
            <FavoriteBorder fontSize="small" />
            <Typography variant="body2" mx="0.5rem">
              40
            </Typography>
          </PostActionContainer>
          <PostActionContainer>
            <BookmarkAddOutlined fontSize="small" />
          </PostActionContainer>
        </Box>
      </Box>
      <MoreHoriz color="disabled" />
    </Box>
  );
};

export { PostCard };
