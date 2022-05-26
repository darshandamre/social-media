import { Avatar, Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  useCreatePostMutation,
  useEditPostMutation,
  useMeQuery
} from "../../app/api";
import { useAppDispatch } from "../../app/hooks";
import { theme } from "../../theme";
import { stringAvatar } from "../../utils/stringAvatar";
import { showAlertThenHide } from "../alert";

export type CreateOrEditPostProps = (
  | {
      type: "create";
      editContent?: undefined;
      postId?: undefined;
    }
  | {
      type: "edit";
      editContent: string;
      postId: string;
    }
) & {
  onClose?: () => void;
};

const CreateOrEditPost = ({
  type,
  editContent,
  postId,
  onClose
}: CreateOrEditPostProps) => {
  const { data } = useMeQuery();
  const [createPost, { isLoading: isCreatePostLoading }] =
    useCreatePostMutation();
  const [saveEditPost, { isLoading: isEditPostLoading }] =
    useEditPostMutation();
  const dispatch = useAppDispatch();

  const isLoading = type === "edit" ? isEditPostLoading : isCreatePostLoading;

  const [content, setContent] = useState(type === "edit" ? editContent : "");
  const [error, setError] = useState("");

  useEffect(() => {
    if (content.length > 500) {
      setError(`post too long, can't enter more than 500 characters`);
    } else if (content.length < 500) {
      setError("");
    }
  }, [content]);

  const handleCreatePost: React.FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault();
    if (content.trim().length === 0) {
      setError(`can't create empty post`);
      return;
    }
    if (error) return;
    type === "edit"
      ? await saveEditPost({ postId, content })
      : await createPost({ content });

    showAlertThenHide(dispatch, {
      message: `Post ${type === "edit" ? "edited" : "created"} successfully`,
      severity: "success"
    });
    onClose?.();
  };

  return (
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
        {type === "edit" ? "save" : "post"}
      </Button>
    </Box>
  );
};

export { CreateOrEditPost };
