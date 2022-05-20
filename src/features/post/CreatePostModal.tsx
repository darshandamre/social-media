import { Close } from "@mui/icons-material";
import { Box, Modal, Typography } from "@mui/material";
import { CreatePost } from "./CreatePost";

interface CreatePostModalProps {
  open: boolean;
  onClose: () => void;
}

const CreatePostModal = ({ open, onClose }: CreatePostModalProps) => {
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
        <CreatePost />
      </Box>
    </Modal>
  );
};

export { CreatePostModal };
