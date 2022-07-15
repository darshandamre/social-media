import { LoadingButton } from "@mui/lab";
import { Avatar, Box, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  CommentsDocument,
  CommentsQuery,
  CommentsQueryVariables,
  useCreateCommentMutation,
  useMeQuery
} from "../../generated/graphql";
import { PostWithAuthorFieldFragment } from "../../generated/graphql";
import { isObjectWithKey } from "../../utils/isObjectWithKey";
import { stringAvatar } from "../../utils/stringAvatar";
import { useAlert } from "../alert";

type CommentBoxProps = {
  post: PostWithAuthorFieldFragment;
  commentRef: React.RefObject<HTMLInputElement>;
};

const CommentBox = ({ post, commentRef }: CommentBoxProps) => {
  const { data: meData } = useMeQuery();
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const { showAlert } = useAlert();
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
    },
    onCompleted: ({ createComment }) => {
      if (createComment) setContent("");
    },
    onError: () =>
      showAlert({
        message: "some error occured",
        severity: "error"
      })
  });

  const { query } = useRouter();

  let autoFocusComment = false;
  if (isObjectWithKey(query, "fc") && typeof query.fc === "boolean") {
    autoFocusComment = query.fc;
  }

  const handleCreateComment: React.FormEventHandler<
    HTMLFormElement
  > = async e => {
    e.preventDefault();
    if (error) return;
    await createComment({ variables: { content, postId: post.id } });
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
