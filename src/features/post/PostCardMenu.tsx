import {
  ClickAwayListener,
  Grow,
  MenuList,
  MenuListProps,
  Paper,
  Popper,
  PopperPlacementType
} from "@mui/material";
import React, { useEffect, useRef } from "react";

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

type PostCardMenuProps = {
  children: MenuListProps["children"];
  open: boolean;
  handleClose: () => void;
  anchorRef: React.RefObject<HTMLButtonElement>;
};

const PostCardMenu = ({
  children,
  open,
  handleClose,
  anchorRef
}: PostCardMenuProps) => {
  const handleListKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Tab") {
      event.preventDefault();
      handleClose();
    } else if (event.key === "Escape") {
      handleClose();
    }
  };

  const handleClickAway = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    handleClose();
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open, anchorRef]);

  return (
    <Popper
      sx={{ zIndex: 10 }}
      open={open}
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
            <ClickAwayListener onClickAway={handleClickAway}>
              <MenuList
                variant="menu"
                autoFocusItem={open}
                id="post-options-menu"
                aria-labelledby="post-options-button"
                onKeyDown={handleListKeyDown}>
                {children}
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
};

export { PostCardMenu };
