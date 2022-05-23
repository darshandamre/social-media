import { ArrowBack } from "@mui/icons-material";
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useUserQuery } from "../../app/api";
import { stringAvatar } from "../../utils/stringAvatar";
import { Loader } from "../common";
import { PostCard } from "../post";
import { ProfileButton } from "./ProfileButton";

type ProfileParams = {
  username: string;
};

const Profile = () => {
  const { username } = useParams<ProfileParams>();
  const { data: userData, isLoading } = useUserQuery({ username: username! });
  const { user } = userData ?? {};
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
            display="block">
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
