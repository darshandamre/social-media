import { MoreHoriz } from "@mui/icons-material";
import { Box, IconButton, MenuItem } from "@mui/material";
import React, { useReducer, useRef, useState } from "react";
import {
  useFollowMutation,
  useMeQuery,
  useUnfollowMutation
} from "../../app/api";
import { PostWithAuthorFieldFragment } from "../../app/api/generated/graphql";
import { useAppDispatch } from "../../app/hooks";
import { showAlertThenHide } from "../alert";
import { CreateOrEditPostModal } from "./CreateOrEditPostModal";
import { DeletePostModal } from "./DeletePostModal";
import { PostCardMenu } from "./PostCardMenu";

type PostCardOptionsProps = {
  post: PostWithAuthorFieldFragment;
};

const PostCardOptions = ({ post }: PostCardOptionsProps) => {
  const { data } = useMeQuery();
  const isMyPost = data?.me?.id === post.authorId;

  const [showDeleteModal, toggleDeleteModal] = useReducer(d => !d, false);
  const [showEditModal, toggleEditModal] = useReducer(e => !e, false);

  const anchorRef = useRef<HTMLButtonElement>(null);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const toggleMenu = () => setOpenMenu(prevOpen => !prevOpen);
  const closeMenu = () => setOpenMenu(false);

  const dispatch = useAppDispatch();
  const [follow] = useFollowMutation();
  const [unfollow] = useUnfollowMutation();

  const handleFollowUnfollow = async () => {
    try {
      const result = post.author?.amIFollowingThem
        ? await unfollow({ unfollowId: post.authorId }).unwrap()
        : await follow({ followId: post.authorId }).unwrap();

      if ("follow" in result && result.follow) {
        showAlertThenHide(dispatch, {
          message: `You Followed @${post.author?.username}`
        });
      }
      if ("unfollow" in result && result.unfollow) {
        showAlertThenHide(dispatch, {
          message: `You unfollowed @${post.author?.username}`
        });
      }
    } catch (err) {
      console.error(err);
      showAlertThenHide(dispatch, {
        message: "some error occured",
        severity: "error"
      });
    }
    closeMenu();
  };

  return (
    <Box onClick={e => e.stopPropagation()}>
      <IconButton
        ref={anchorRef}
        id="post-options-button"
        aria-controls={openMenu ? "post-options-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={openMenu ? "true" : undefined}
        onClick={toggleMenu}>
        <MoreHoriz color="disabled" />
      </IconButton>
      <PostCardMenu
        open={openMenu}
        handleClose={closeMenu}
        anchorRef={anchorRef}>
        {isMyPost ? (
          [
            <MenuItem
              key={0}
              onClick={() => {
                toggleEditModal();
                closeMenu();
              }}>
              Edit Post
            </MenuItem>,
            <MenuItem
              key={1}
              onClick={() => {
                toggleDeleteModal();
                closeMenu();
              }}
              sx={{ color: "error.main" }}>
              Delete Post
            </MenuItem>
          ]
        ) : (
          <MenuItem
            onClick={handleFollowUnfollow}
            sx={{
              color: post.author?.amIFollowingThem
                ? "error.main"
                : "primary.main"
            }}>
            {post.author?.amIFollowingThem ? "Unfollow" : "Follow"} @
            {post.author?.username}
          </MenuItem>
        )}
      </PostCardMenu>

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
    </Box>
  );
};

export { PostCardOptions };
