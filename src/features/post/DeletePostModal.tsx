import { Avatar, Box, Button, Modal, Typography } from "@mui/material";
import {
  PostWithAuthorFieldFragment,
  useDeletePostMutation
} from "../../generated/graphql";
import { stringAvatar } from "../../utils/stringAvatar";
import { useAlert } from "../alert";

type DeletePostModalProps = {
  open: boolean;
  handleClose: () => void;
  post: PostWithAuthorFieldFragment;
};

const DeletePostModal = ({ post, open, handleClose }: DeletePostModalProps) => {
  const { id, author, content } = post;
  const { showAlert } = useAlert();
  const [deletePost, { loading }] = useDeletePostMutation({
    update(cache, { data }) {
      if (!data?.deletePost) return;
      cache.evict({ id: `Post:${id}` });
    },
    onCompleted: ({ deletePost }) => {
      if (deletePost) {
        showAlert({
          message: "post deleted successfully",
          severity: "success"
        });
      } else {
        showAlert({
          message: "some error occured, post not deleted",
          severity: "error"
        });
      }
    },
    onError: () => {
      showAlert({
        message: "some error occured, post not deleted",
        severity: "error"
      });
    }
  });

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
      <Box
        px="1.2rem"
        py="1rem"
        bgcolor="background.paper"
        width="30rem"
        maxWidth="90%"
        borderRadius={2}>
        <Typography variant="h5">Delete Post</Typography>
        <Typography variant="body1">
          Are you sure you want to delete this post?
        </Typography>
        <Box
          my="0.5rem"
          px="1rem"
          py="0.75rem"
          display="flex"
          sx={theme => ({
            border: `1px solid ${theme.palette.background.default}`,
            borderRadius: 1.5
          })}>
          <Avatar
            sx={{ textDecoration: "none", ...stringAvatar(author?.name)?.sx }}>
            {stringAvatar(author?.name)?.children}
          </Avatar>
          <Box mx="0.75rem" flexGrow={1}>
            <Box display="flex">
              {author?.name ? (
                <Typography mr="0.5rem">{author.name}</Typography>
              ) : null}
              <Typography color="InactiveCaptionText">
                @{author?.username}
              </Typography>
            </Box>
            <Typography>{content}</Typography>
          </Box>
        </Box>
        <Box display="flex">
          <Button
            color="inherit"
            sx={{ ml: "auto", mr: "1rem" }}
            onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={async () => {
              if (loading) return;
              await deletePost({
                variables: { postId: id }
              });
              handleClose();
            }}
            variant="contained"
            color="error">
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export { DeletePostModal };
