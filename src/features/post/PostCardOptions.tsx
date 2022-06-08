import { MoreHoriz } from "@mui/icons-material";
import { IconButton, MenuItem } from "@mui/material";
import React, { useReducer, useRef, useState } from "react";
import {
  useFollowMutation,
  useMeQuery,
  useUnfollowMutation
} from "../../app/api";
import {
  CommentsQuery,
  PostWithAuthorFieldFragment
} from "../../app/api/generated/graphql";
import { useAppDispatch } from "../../app/hooks";
import { showAlertThenHide } from "../alert";
import { CreateOrEditPostModal } from "./CreateOrEditPostModal";
import { DeletePostModal } from "./DeletePostModal";
import { PostCardMenu } from "./PostCardMenu";

type PostCardOptionsProps = {
  postOrComment:
    | PostWithAuthorFieldFragment
    | CommentsQuery["comments"][number];
};

const PostCardOptions = ({ postOrComment }: PostCardOptionsProps) => {
  const { data } = useMeQuery();
  const isMyPost = data?.me?.id === postOrComment.authorId;

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
      const result = postOrComment.author?.amIFollowingThem
        ? await unfollow({ unfollowId: postOrComment.authorId }).unwrap()
        : await follow({ followId: postOrComment.authorId }).unwrap();

      if ("follow" in result && result.follow) {
        showAlertThenHide(dispatch, {
          message: `You Followed @${postOrComment.author?.username}`
        });
      }
      if ("unfollow" in result && result.unfollow) {
        showAlertThenHide(dispatch, {
          message: `You unfollowed @${postOrComment.author?.username}`
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
    <>
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
              color: postOrComment.author?.amIFollowingThem
                ? "error.main"
                : "primary.main"
            }}>
            {postOrComment.author?.amIFollowingThem ? "Unfollow" : "Follow"} @
            {postOrComment.author?.username}
          </MenuItem>
        )}
      </PostCardMenu>

      <DeletePostModal
        postOrComment={postOrComment}
        open={showDeleteModal}
        handleClose={toggleDeleteModal}
      />
      <CreateOrEditPostModal
        type="edit"
        editContent={postOrComment.content}
        postId={postOrComment.id}
        open={showEditModal}
        onClose={toggleEditModal}
      />
    </>
  );
};

export { PostCardOptions };
