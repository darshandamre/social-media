import { Close } from "@mui/icons-material";
import { Box, IconButton, Modal, Typography } from "@mui/material";
import { CreateOrEditPost, CreateOrEditPostProps } from "./CreateOrEditPost";

type CreateOrEditPostModalProps = {
  open: boolean;
  onClose: () => void;
} & CreateOrEditPostProps;

const CreateOrEditPostModal = ({
  open,
  onClose,
  ...props
}: CreateOrEditPostModalProps) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
      <Box
        sx={{
          mx: "2rem",
          width: "40rem",
          maxWidth: "100%",
          bgcolor: "background.paper"
        }}>
        <Typography
          variant="h6"
          mt="0.5rem"
          mx="1rem"
          display="flex"
          alignItems="center">
          {props.type === "edit" ? "Edit" : "Create"} post
          <IconButton sx={{ ml: "auto" }} onClick={onClose}>
            <Close />
          </IconButton>
        </Typography>
        <CreateOrEditPost {...props} onClose={onClose} />
      </Box>
    </Modal>
  );
};

export { CreateOrEditPostModal };
