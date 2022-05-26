import { Close } from "@mui/icons-material";
import { Box, Modal, Typography } from "@mui/material";
import { CreateOrEditPost } from "./CreateOrEditPost";

interface CreateOrEditPostModalProps {
  open: boolean;
  onClose: () => void;
}

const CreateOrEditPostModal = ({
  open,
  onClose
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
          Create post
          <Close sx={{ ml: "auto", cursor: "pointer" }} onClick={onClose} />
        </Typography>
        <CreateOrEditPost />
      </Box>
    </Modal>
  );
};

export { CreateOrEditPostModal };
