import { PostWithAuthorFieldFragment } from "../../app/api/generated/graphql";
import { Loader } from "../common";
import { CreateOrEditPost, PostCard } from "../post";

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
          <CreateOrEditPost type="create" />
          {posts?.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </>
      )}
    </>
  );
};

export { BaseFeed };
