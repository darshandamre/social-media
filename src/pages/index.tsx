import { ApolloError } from "@apollo/client";
import { GetServerSideProps, NextPage } from "next";
import { Layout } from "../features/common";
import { BaseFeed } from "../features/feed";
import { UserFeedDocument, useUserFeedQuery } from "../generated/graphql";
import { addApolloState, initializeApollo } from "../utils/apolloClient";

const Home: NextPage = () => {
  const { data, loading } = useUserFeedQuery();

  return (
    <Layout>
      <BaseFeed isLoading={loading} posts={data?.userFeed} />
    </Layout>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async ctx => {
  try {
    const apolloClient = initializeApollo({ cookies: ctx.req.cookies });
    await apolloClient.query({
      query: UserFeedDocument
    });

    return addApolloState(apolloClient, {
      props: {}
    });
  } catch (err) {
    if (
      err instanceof ApolloError &&
      err.graphQLErrors.some(e => e.message === "not authenticated")
    ) {
      return {
        redirect: {
          destination: "/login?from=" + encodeURIComponent(ctx.resolvedUrl),
          permanent: false
        }
      };
    }

    throw err;
  }
};
