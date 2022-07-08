import { LoadingButton } from "@mui/lab";
import { Avatar, Box, TextField } from "@mui/material";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  CommentsDocument,
  CommentsQuery,
  CommentsQueryVariables,
  useCreateCommentMutation,
  useMeQuery
} from "../../generated/graphql";
import { PostWithAuthorFieldFragment } from "../../generated/graphql";
import { useAppDispatch } from "../../app/hooks";
import { isObjectWithKey } from "../../utils/isObjectWithKey";
import { stringAvatar } from "../../utils/stringAvatar";
import { showAlertThenHide } from "../alert";

type CommentBoxProps = {
  post: PostWithAuthorFieldFragment;
  commentRef: React.RefObject<HTMLInputElement>;
};

const CommentBox = ({ post, commentRef }: CommentBoxProps) => {
  const { data: meData } = useMeQuery();
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [createComment, { loading }] = useCreateCommentMutation({
    update(cache, { data: createCommentData }) {
      if (!createCommentData?.createComment) return;

      cache.updateQuery<CommentsQuery, CommentsQueryVariables>(
        {
          query: CommentsDocument,
          variables: { postId: post.id }
        },
        commentsData => {
          if (!commentsData?.comments) return;

          return {
            __typename: "Query",
            comments: [
              {
                ...createCommentData.createComment,
                author: meData?.me
              },
              ...commentsData.comments
            ]
          };
        }
      );
    }
  });
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
      await createComment({ variables: { content, postId: post.id } });
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
      <Avatar {...stringAvatar(meData?.me?.name)} />
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
        loading={loading}
        disabled={!!error || content.length === 0}>
        Comment
      </LoadingButton>
    </Box>
  );
};

export { CommentBox };
