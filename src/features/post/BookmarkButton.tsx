import { Bookmark, BookmarkAddOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import {
  useAddBookmarkMutationAndUpdateCache,
  useRemoveBookmarkMutationAndUpdateCache
} from "../../hooks";
import { PostActionContainer } from "./PostActionContainer";

interface BookmarkButtonProps {
  isBookmarkedByMe: boolean;
  postId: string;
}

const BookmarkButton = ({ isBookmarkedByMe, postId }: BookmarkButtonProps) => {
  const [addBookmark, { loading: isAddBookmarkLoading }] =
    useAddBookmarkMutationAndUpdateCache({ variables: { postId } });
  const [removeBookmark, { loading: isRemoveBookmarkLoading }] =
    useRemoveBookmarkMutationAndUpdateCache({ variables: { postId } });
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
          isBookmarkedByMe ? removeBookmark() : addBookmark();
        }}>
        {bookmarkIcon}
      </IconButton>
    </PostActionContainer>
  );
};

export { BookmarkButton };
