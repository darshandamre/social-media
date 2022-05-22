import { useParams } from "react-router-dom";
import { Typography, IconButton, Avatar, Box, Button } from "@mui/material";
import { useUserQuery } from "../../app/api";
import { Loader } from "../common";
import { ArrowBack } from "@mui/icons-material";
import { stringAvatar } from "../../utils/stringAvatar";
import { PostCard } from "../post";

type ProfileParams = {
  username: string;
};

const Profile = () => {
  const { username } = useParams<ProfileParams>();
  const { data, isLoading } = useUserQuery({ username: username! });
  const { user } = data ?? {};

  if (isLoading) return <Loader />;

  if (!user) return <Box>user not found</Box>;

  const { id, name, bio, portfolioLink, posts } = user;

  return (
    <>
      <Typography
        variant="h5"
        sx={({ palette }) => ({
          py: 1,
          borderBottom: `1px solid ${palette.background.paper}`,
          display: "flex",
          alignItems: "center"
        })}>
        <IconButton
          sx={{
            mx: 1
          }}>
          <ArrowBack />
        </IconButton>
        <span>{name}</span>
      </Typography>

      <Box mx="1rem">
        <Box mt="2rem" mb="1.5rem" display="flex" alignItems="center">
          <Avatar
            {...stringAvatar(name)}
            sx={{
              width: "7rem",
              height: "7rem"
            }}
          />

          <Button
            sx={{
              ml: "auto",
              mr: "0.5rem",
              mt: "2rem",
              borderRadius: "16px",
              fontWeight: "600"
            }}
            size="large"
            type="submit"
            variant="contained">
            Follow
          </Button>
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
            color="primary.dark">
            {portfolioLink}
          </Box>
        ) : null}

        <Typography variant="h5" my="1rem">
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
                name
              }
            }}
          />
        ))}
      </Box>
    </>
  );
};

export { Profile };
