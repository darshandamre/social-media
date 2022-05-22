import { Box, BoxProps, styled } from "@mui/material";

export const PostActionContainer = styled(Box)<BoxProps>({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  "&:hover > .MuiIconButton-root": {
    backgroundColor: "rgba(255, 255, 255, 0.08)"
  }
});
