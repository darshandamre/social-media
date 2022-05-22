import { useLikedPostsQuery } from "../../app/api";
import { Loader } from "../common";
import { PostCard } from "../post";

const LikesPage = () => {
  const { data, isLoading } = useLikedPostsQuery();

  if (isLoading) return <Loader />;

  return (
    <>
      {data?.likedPosts?.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </>
  );
};

export { LikesPage };
