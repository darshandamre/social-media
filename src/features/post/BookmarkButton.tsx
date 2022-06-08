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
  const [addBookmark, { isLoading: isAddBookmarkLoading }] =
    useAddBookmarkMutation();
  const [removeBookmark, { isLoading: isRemoveBookmarkLoading }] =
    useRemoveBookmarkMutation();
  const bookmarkIcon = isBookmarkedByMe ? (
    <Bookmark fontSize="small" />
  ) : (
    <BookmarkAddOutlined fontSize="small" />
  );
  return (
    <PostActionContainer>
      <IconButton
        onClick={e => {
          e.stopPropagation();
          if (isAddBookmarkLoading || isRemoveBookmarkLoading) return;
          isBookmarkedByMe
            ? removeBookmark({ postId })
            : addBookmark({ postId });
        }}>
        {bookmarkIcon}
      </IconButton>
    </PostActionContainer>
  );
};

export { BookmarkButton };
