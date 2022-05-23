import { PostWithAuthorFieldFragment } from "../../app/api/generated/graphql";
import { Loader } from "../common";
import { CreatePost, PostCard } from "../post";

type BaseFeedProps = {
  isLoading?: boolean;
  posts?: PostWithAuthorFieldFragment[];
};

const BaseFeed = ({ isLoading, posts }: BaseFeedProps) => {
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <CreatePost />
          {posts?.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </>
      )}
    </>
  );
};

export { BaseFeed };
