import { MoreHoriz } from "@mui/icons-material";
import { Backdrop, IconButton, List, ListItemButton } from "@mui/material";
import { useReducer } from "react";
import { useMeQuery } from "../../app/api";
import { PostWithAuthorFieldFragment } from "../../app/api/generated/graphql";
import { DeletePostModal } from "./DeletePostModal";

type PostCardOptionsProps = {
  post: PostWithAuthorFieldFragment;
};

const PostCardOptions = ({ post }: PostCardOptionsProps) => {
  const { data } = useMeQuery();
  const [showOptions, toggleOptions] = useReducer(s => !s, false);
  const isMyPost = data?.me?.id === post.authorId;

  const [showDeleteModal, toggleDeleteModal] = useReducer(d => !d, false);

  return (
    <>
      <IconButton onClick={toggleOptions}>
        <MoreHoriz color="disabled" />
      </IconButton>
      <Backdrop
        sx={{
          bgcolor: "rgba(0, 0, 0, 0)",
          zIndex: 5
        }}
        open={showOptions}
        onClick={toggleOptions}
      />
      {showOptions ? (
        <List
          sx={{
            bgcolor: "background.paper",
            position: "absolute",
            right: "1rem",
            top: "1rem",
            zIndex: 6,
            borderRadius: 1
          }}>
          {isMyPost ? (
            <>
              <ListItemButton>Edit Post</ListItemButton>
              <ListItemButton
                onClick={() => {
                  toggleDeleteModal();
                  toggleOptions();
                }}
                sx={{ color: "error.main" }}>
                Delete Post
              </ListItemButton>
            </>
          ) : (
            <ListItemButton sx={{ color: "primary.main" }}>
              Follow @{post.author?.username}
            </ListItemButton>
          )}
        </List>
      ) : null}
      <DeletePostModal
        post={post}
        open={showDeleteModal}
        handleClose={toggleDeleteModal}
      />
    </>
  );
};

export { PostCardOptions };
