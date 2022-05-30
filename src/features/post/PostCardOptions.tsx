import { MoreHoriz } from "@mui/icons-material";
import { Backdrop, IconButton, List, ListItemButton } from "@mui/material";
import { useReducer } from "react";
import {
  useFollowMutation,
  useMeQuery,
  useUnfollowMutation
} from "../../app/api";
import { PostWithAuthorFieldFragment } from "../../app/api/generated/graphql";
import { CreateOrEditPostModal } from "./CreateOrEditPostModal";
import { DeletePostModal } from "./DeletePostModal";

type PostCardOptionsProps = {
  post: PostWithAuthorFieldFragment;
};

const PostCardOptions = ({ post }: PostCardOptionsProps) => {
  const { data } = useMeQuery();
  const [showOptions, toggleOptions] = useReducer(s => !s, false);
  const isMyPost = data?.me?.id === post.authorId;

  const [showDeleteModal, toggleDeleteModal] = useReducer(d => !d, false);
  const [showEditModal, toggleEditModal] = useReducer(e => !e, false);

  const [follow] = useFollowMutation();
  const [unfollow] = useUnfollowMutation();

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
              <ListItemButton
                onClick={() => {
                  toggleEditModal();
                  toggleOptions();
                }}>
                Edit Post
              </ListItemButton>
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
            <ListItemButton
              onClick={() => {
                post.author?.amIFollowingThem
                  ? unfollow({ unfollowId: post.authorId })
                  : follow({ followId: post.authorId });
              }}
              sx={{
                color: post.author?.amIFollowingThem
                  ? "error.main"
                  : "primary.main"
              }}>
              {post.author?.amIFollowingThem ? "Unfollow" : "Follow"} @
              {post.author?.username}
            </ListItemButton>
          )}
        </List>
      ) : null}
      <DeletePostModal
        post={post}
        open={showDeleteModal}
        handleClose={toggleDeleteModal}
      />

      <CreateOrEditPostModal
        type="edit"
        editContent={post.content}
        postId={post.id}
        open={showEditModal}
        onClose={toggleEditModal}
      />
    </>
  );
};

export { PostCardOptions };
