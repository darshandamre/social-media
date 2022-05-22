import { Bookmark, BookmarkAddOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import {
  useAddBookmarkMutation,
  useRemoveBookmarkMutation
} from "../../app/api";
import { PostActionContainer } from "./PostActionContainer";

interface BookmarkButtonProps {
  isBookmarkedByMe: boolean;
  postId: string;
}

const BookmarkButton = ({ isBookmarkedByMe, postId }: BookmarkButtonProps) => {
  const [addBookmark] = useAddBookmarkMutation();
  const [removeBookmark] = useRemoveBookmarkMutation();
  const bookmarkIcon = isBookmarkedByMe ? (
    <Bookmark fontSize="small" />
  ) : (
    <BookmarkAddOutlined fontSize="small" />
  );
  return (
    <PostActionContainer
      onClick={() => {
        isBookmarkedByMe ? removeBookmark({ postId }) : addBookmark({ postId });
      }}>
      <IconButton>{bookmarkIcon}</IconButton>
    </PostActionContainer>
  );
};

export { BookmarkButton };
