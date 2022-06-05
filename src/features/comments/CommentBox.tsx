import { Avatar, Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useMeQuery } from "../../app/api";
import { PostWithAuthorFieldFragment } from "../../app/api/generated/graphql";
import { stringAvatar } from "../../utils/stringAvatar";

type CommentBoxProps = {
  post: PostWithAuthorFieldFragment;
};

const CommentBox = ({ post }: CommentBoxProps) => {
  const { data } = useMeQuery();
  const [content, setContent] = useState("");

  const handleCreateComment: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
  };

  return (
    <Box component="form" onSubmit={handleCreateComment} m={2} display="flex">
      <Avatar {...stringAvatar(data?.me?.name)} />
      <TextField
        multiline
        variant="standard"
        placeholder={`Reply to @${post.author?.username}`}
        value={content}
        onChange={e => setContent(e.target.value)}
        // error={!!error}
        // helperText={error}
        sx={{
          mx: 2,
          flexGrow: 1,
          alignSelf: "center"
        }}
      />
      <Button
        sx={{
          my: 1,
          borderRadius: "100vw",
          alignSelf: "end"
        }}
        type="submit"
        variant="outlined">
        Comment
      </Button>
    </Box>
  );
};

export { CommentBox };
