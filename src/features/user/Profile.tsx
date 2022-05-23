import { useNavigate, useParams } from "react-router-dom";
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
  const navigate = useNavigate();

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
          onClick={() => navigate(-1)}
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
              borderRadius: "100vw",
              fontWeight: "600"
            }}
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
              name
            }
          }}
        />
      ))}
    </>
  );
};

export { Profile };
