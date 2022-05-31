import { MoreHoriz } from "@mui/icons-material";
import {
  IconButton,
  MenuItem,
  Popper,
  Paper,
  ClickAwayListener,
  MenuList,
  Grow,
  PopperPlacementType
} from "@mui/material";
import React, { useEffect, useReducer, useRef, useState } from "react";
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

const getMenuOrigin = (placement: PopperPlacementType) => {
  switch (placement) {
    case "bottom-start":
      return "top left";
    case "bottom-end":
      return "top right";
    case "top-start":
      return "bottom left";
    case "top-end":
      return "bottom right";
  }
};

const PostCardOptions = ({ post }: PostCardOptionsProps) => {
  const { data } = useMeQuery();
  const isMyPost = data?.me?.id === post.authorId;

  const [showDeleteModal, toggleDeleteModal] = useReducer(d => !d, false);
  const [showEditModal, toggleEditModal] = useReducer(e => !e, false);

  const [follow] = useFollowMutation();
  const [unfollow] = useUnfollowMutation();

  const anchorRef = useRef<HTMLButtonElement>(null);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const toggleMenu = () => setOpenMenu(prevOpen => !prevOpen);
  const handleCloseMenu = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    setOpenMenu(false);
  };

  const handleListKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpenMenu(false);
    } else if (event.key === "Escape") {
      setOpenMenu(false);
    }
  };

  const prevOpen = useRef(openMenu);
  useEffect(() => {
    console.log(prevOpen);

    if (prevOpen.current === true && openMenu === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = openMenu;
  }, [openMenu]);

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
      <Popper
        sx={{ zIndex: 10 }}
        open={openMenu}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: getMenuOrigin(placement)
            }}>
            <Paper>
              <ClickAwayListener onClickAway={handleCloseMenu}>
                <MenuList
                  variant="menu"
                  autoFocusItem={openMenu}
                  id="post-options-menu"
                  aria-labelledby="post-options-button"
                  onKeyDown={handleListKeyDown}>
                  {isMyPost ? (
                    [
                      <MenuItem
                        key={0}
                        onClick={() => {
                          toggleEditModal();
                          setOpenMenu(false);
                        }}>
                        Edit Post
                      </MenuItem>,
                      <MenuItem
                        key={1}
                        onClick={() => {
                          toggleDeleteModal();
                          setOpenMenu(false);
                        }}
                        sx={{ color: "error.main" }}>
                        Delete Post
                      </MenuItem>
                    ]
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
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>

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
