import { LoadingButton } from "@mui/lab";
import { Avatar, Box, TextField } from "@mui/material";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useCreateCommentMutation, useMeQuery } from "../../app/api";
import { PostWithAuthorFieldFragment } from "../../app/api/generated/graphql";
import { useAppDispatch } from "../../app/hooks";
import { isObjectWithKey } from "../../utils/isObjectWithKey";
import { stringAvatar } from "../../utils/stringAvatar";
import { showAlertThenHide } from "../alert";
import "./enhancedCommentsApi";

type CommentBoxProps = {
  post: PostWithAuthorFieldFragment;
  commentRef: React.RefObject<HTMLInputElement>;
};

const CommentBox = ({ post, commentRef }: CommentBoxProps) => {
  const { data } = useMeQuery();
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [createComment, { isLoading }] = useCreateCommentMutation();
  const dispatch = useAppDispatch();
  const { state } = useLocation();

  let autoFocusComment = false;
  if (isObjectWithKey(state, "autoFocusComment")) {
    autoFocusComment = state.autoFocusComment as boolean;
  }

  const handleCreateComment: React.FormEventHandler<
    HTMLFormElement
  > = async e => {
    e.preventDefault();
    if (error) return;

    try {
      await createComment({ content, postId: post.id }).unwrap();
      setContent("");
    } catch {
      showAlertThenHide(dispatch, {
        message: "some error occured",
        severity: "error"
      });
    }
  };

  return (
    <Box component="form" onSubmit={handleCreateComment} m={2} display="flex">
      <Avatar {...stringAvatar(data?.me?.name)} />
      <TextField
        multiline
        autoFocus={autoFocusComment}
        inputRef={commentRef}
        variant="standard"
        placeholder={`Reply to @${post.author?.username}`}
        value={content}
        onChange={e => {
          setContent(e.target.value);
          if (e.target.value.length > 500) {
            setError("comment cannot be more than 500 characters");
          } else {
            setError("");
          }
        }}
        error={!!error}
        helperText={error}
        sx={{
          mx: 2,
          flexGrow: 1,
          alignSelf: "center"
        }}
      />
      <LoadingButton
        variant="outlined"
        sx={{
          my: 1,
          borderRadius: "100vw",
          alignSelf: "end"
        }}
        type="submit"
        loading={isLoading}
        disabled={!!error || content.length === 0}>
        Comment
      </LoadingButton>
    </Box>
  );
};

export { CommentBox };
