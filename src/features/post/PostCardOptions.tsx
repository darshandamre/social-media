import { MoreHoriz } from "@mui/icons-material";
import { IconButton, MenuItem, Menu } from "@mui/material";
import { useReducer, useState } from "react";
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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = !!anchorEl;
  const closeMenu = () => setAnchorEl(null);

  const isMyPost = data?.me?.id === post.authorId;

  const [showDeleteModal, toggleDeleteModal] = useReducer(d => !d, false);
  const [showEditModal, toggleEditModal] = useReducer(e => !e, false);

  const [follow] = useFollowMutation();
  const [unfollow] = useUnfollowMutation();

  return (
    <>
      <IconButton
        id="post-options-button"
        aria-controls={open ? "post-options-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={e => setAnchorEl(e.currentTarget)}>
        <MoreHoriz color="disabled" />
      </IconButton>
      <Menu
        id="post-options-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={closeMenu}
        MenuListProps={{
          "aria-labelledby": "post-options-button"
        }}>
        {isMyPost ? (
          <>
            <MenuItem
              onClick={() => {
                toggleEditModal();
                closeMenu();
              }}>
              Edit Post
            </MenuItem>
            <MenuItem
              onClick={() => {
                toggleDeleteModal();
                closeMenu();
              }}
              sx={{ color: "error.main" }}>
              Delete Post
            </MenuItem>
          </>
        ) : (
          <MenuItem
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
          </MenuItem>
        )}
      </Menu>
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
