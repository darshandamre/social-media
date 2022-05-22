import { useBookmarkedPostsQuery } from "../../app/api";
import { Loader } from "../common";
import { PostCard } from "../post";

const BookmarksPage = () => {
  const { data, isLoading } = useBookmarkedPostsQuery();

  if (isLoading) return <Loader />;

  return (
    <>
      {data?.bookmarkedPosts?.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </>
  );
};

export { BookmarksPage };
