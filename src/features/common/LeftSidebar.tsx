import {
  AccountCircle,
  AccountCircleOutlined,
  Bookmark,
  BookmarkBorderOutlined,
  Favorite,
  FavoriteBorder,
  Home,
  HomeOutlined,
  LocalFireDepartment,
  MoreHoriz,
  Notifications,
  NotificationsNone,
  Rocket,
  RocketOutlined
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Typography
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useMeQuery } from "../../app/api";
import { stringAvatar } from "../../utils/stringAvatar";
import { CreatePostModal } from "../post";
import { MyNavLink } from "./MyNavLink";

const LeftSidebar = () => {
  const { data, isLoading } = useMeQuery();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <Box
        p={1}
        display="flex"
        flexDirection="column"
        height="100%"
        maxHeight="100vh"
        position="sticky"
        top={0}>
        <Box display="flex">
          <Box
            component={Link}
            to="/"
            sx={{
              py: "0.5rem",
              textDecoration: "none",
              color: "inherit",
              display: "flex",
              alignItems: "center"
            }}>
            <LocalFireDepartment
              sx={{
                mx: "1rem",
                fontSize: "1.8rem"
              }}
            />
            <Typography
              variant="h4"
              component="div"
              sx={{
                cursor: "pointer",
                textDecoration: "none",
                color: "inherit"
              }}>
              Blaze
            </Typography>
          </Box>
        </Box>

        <MyNavLink to="/" icon={HomeOutlined} activeIcon={Home}>
          Home
        </MyNavLink>
        <MyNavLink to="/explore" icon={RocketOutlined} activeIcon={Rocket}>
          Explore
        </MyNavLink>
        <MyNavLink to="/likes" icon={FavoriteBorder} activeIcon={Favorite}>
          Likes
        </MyNavLink>
        <MyNavLink
          to="/bookmarks"
          icon={BookmarkBorderOutlined}
          activeIcon={Bookmark}>
          Bookmarks
        </MyNavLink>
        <MyNavLink
          to="/notifications"
          icon={NotificationsNone}
          activeIcon={Notifications}>
          Notifications
        </MyNavLink>
        <MyNavLink
          to={data?.me ? `/u/${data.me.username}` : "/login"}
          icon={AccountCircleOutlined}
          activeIcon={AccountCircle}>
          Profile
        </MyNavLink>

        <Button
          sx={{
            my: 1,
            py: 1,
            maxWidth: "20rem",
            borderRadius: "16px",
            fontWeight: "600"
          }}
          size="large"
          variant="contained"
          onClick={handleOpen}>
          create post
        </Button>

        <Box mt="auto">
          {isLoading ? (
            <Box display="flex" alignItems="center" justifyContent="center">
              <CircularProgress color="primary" />
            </Box>
          ) : (
            <Box
              component={Link}
              to={`/u/${data?.me?.username}`}
              sx={{
                p: 1,
                maxWidth: "20rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                borderRadius: "100vh",
                textDecoration: "none",
                color: "inherit",
                "&:hover": {
                  bgcolor: "background.paper"
                }
              }}>
              <Avatar {...stringAvatar(data?.me?.name)} />
              <Box mx={1}>
                <Typography>{data?.me?.name}</Typography>
                <Typography color="InactiveCaptionText" lineHeight={1}>
                  @{data?.me?.username}
                </Typography>
              </Box>
              <IconButton onClick={e => e.preventDefault()} sx={{ ml: "auto" }}>
                <MoreHoriz />
              </IconButton>
            </Box>
          )}
        </Box>
      </Box>
      <CreatePostModal open={isOpen} onClose={handleClose} />
    </>
  );
};

export { LeftSidebar };
