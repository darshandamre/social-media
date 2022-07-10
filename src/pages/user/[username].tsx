import { ArrowBack } from "@mui/icons-material";
import { Box, Typography, IconButton, Avatar } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Layout, Loader } from "../../features/common";
import { PostCard } from "../../features/post";
import { ProfileButton } from "../../features/user";
import { useUserQuery } from "../../generated/graphql";
import { stringAvatar } from "../../utils";

const ProfilePage: NextPage = () => {
  const router = useRouter();

  let skip = false;
  if (typeof router.query.username !== "string") {
    skip = true;
  }
  const { data: userData, loading } = useUserQuery({
    skip,
    variables: { username: router.query.username as string }
  });

  if (loading) return <Loader />;

  if (!userData?.user) return <Box>user not found</Box>;

  const { user } = userData;
  const { id, username, name, bio, portfolioLink, posts } = user;

  return (
    <Layout>
      <Typography
        variant="h5"
        sx={({ palette }) => ({
          py: 1,
          borderBottom: `1px solid ${palette.background.paper}`,
          display: "flex",
          alignItems: "center"
        })}>
        <IconButton
          onClick={() => router.back()}
          sx={{
            mx: 1
          }}>
          <ArrowBack />
        </IconButton>
        <span>{name ? name : `@${username}`}</span>
      </Typography>

      <Box mx="1rem">
        <Box mt="2rem" mb="1.5rem" display="flex" alignItems="center">
          <Avatar
            sx={{
              width: "7rem",
              height: "7rem",
              fontSize: "2rem",
              ...stringAvatar(name)?.sx
            }}>
            {stringAvatar(name)?.children}
          </Avatar>
          <ProfileButton user={user} />
        </Box>

        <Box my="1rem">
          <Typography variant="h5">{name}</Typography>
          <Typography color="InactiveCaptionText" lineHeight={1}>
            @{username}
          </Typography>
        </Box>

        <Typography my="1rem">{bio}</Typography>
        {portfolioLink ? (
          <Box
            component="a"
            href={portfolioLink}
            target="_blank"
            rel="noreferrer"
            my="0.5rem"
            color="primary.dark"
            display="block"
            sx={{
              wordWrap: "break-word"
            }}>
            {portfolioLink}
          </Box>
        ) : null}
      </Box>
      <Typography
        variant="h5"
        py="0.5rem"
        px="1rem"
        sx={({ palette }) => ({
          borderTop: `1px solid ${palette.background.paper}`,
          borderBottom: `1px solid ${palette.background.paper}`
        })}>
        Posts
      </Typography>
      {posts?.map(post => (
        <PostCard
          key={post.id}
          post={{
            ...post,
            authorId: id,
            author: {
              id,
              username: user.username,
              name,
              amIFollowingThem: false,
              __typename: "User"
            }
          }}
        />
      ))}
    </Layout>
  );
};

export default ProfilePage;
