import { Alert, Avatar, Box, Button, Slide, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useCreatePostMutation, useMeQuery } from "../../app/api";
import { theme } from "../../theme";
import { stringAvatar } from "../../utils/stringAvatar";

const CreatePost = () => {
  const { data } = useMeQuery();
  const [createPost, { isLoading, isSuccess }] = useCreatePostMutation();
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (content.length > 500) {
      setError(`post too long, can't enter more than 500 characters`);
    } else if (content.length < 500) {
      setError("");
    }
  }, [content]);

  const handleCreatePost: React.FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault();
    if (error || content.length === 0) return;
    await createPost({ content });
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 4000);
    setContent("");
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleCreatePost}
        sx={{
          p: "1rem",
          display: "flex",
          borderBottom: `1px solid ${theme.palette.background.paper}`
        }}>
        <Avatar {...stringAvatar(data?.me?.name)} />

        <TextField
          multiline
          fullWidth
          minRows={2}
          variant="standard"
          placeholder="Share something interesting..."
          value={content}
          onChange={e => setContent(e.target.value)}
          error={!!error}
          helperText={error}
          sx={{
            mx: "1rem",
            // width: "100%",
            flexGrow: 1
          }}
        />

        <Button
          sx={{
            my: 1,
            borderRadius: "16px",
            fontWeight: "600",
            alignSelf: "end"
          }}
          type="submit"
          variant="contained"
          disabled={!!error || isLoading}>
          post
        </Button>
      </Box>

      <Slide direction="up" in={showAlert && isSuccess}>
        <Alert
          sx={{ position: "fixed", bottom: "5%", left: "5%", zIndex: 99 }}
          severity="success"
          variant="filled">
          Post created successfully.
        </Alert>
      </Slide>
    </>
  );
};

export { CreatePost };
