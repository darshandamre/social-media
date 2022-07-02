import { Bookmark, BookmarkAddOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import {
  useAddBookmarkMutation,
  useRemoveBookmarkMutation
} from "../../generated/graphql";
import { PostActionContainer } from "./PostActionContainer";

interface BookmarkButtonProps {
  isBookmarkedByMe: boolean;
  postId: string;
}

const BookmarkButton = ({ isBookmarkedByMe, postId }: BookmarkButtonProps) => {
  const [addBookmark, { loading: isAddBookmarkLoading }] =
    useAddBookmarkMutation();
  const [removeBookmark, { loading: isRemoveBookmarkLoading }] =
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
            ? removeBookmark({ variables: { postId } })
            : addBookmark({ variables: { postId } });
        }}>
        {bookmarkIcon}
      </IconButton>
    </PostActionContainer>
  );
};

export { BookmarkButton };
