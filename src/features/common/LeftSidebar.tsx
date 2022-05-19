import {
  AccountCircle,
  AccountCircleOutlined,
  Bookmark,
  BookmarkBorderOutlined,
  Favorite,
  FavoriteBorder,
  Home,
  HomeOutlined,
  MoreHoriz,
  Notifications,
  NotificationsNone,
  Rocket,
  RocketOutlined
} from "@mui/icons-material";
import { Avatar, Box, CircularProgress, Typography } from "@mui/material";
import { useMeQuery } from "../../app/api";
import { MyNavLink } from "./MyNavLink";

const getInitials = (name: string): string => {
  return name
    .split(/\s/)
    .map(str => str[0]?.toUpperCase())
    .join("");
};

const LeftSidebar = () => {
  const { data, isLoading } = useMeQuery();
  const initials = getInitials(data?.me?.name ?? "");

  return (
    <Box p={1} display="flex" flexDirection="column" height="100%">
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
        to="/profile"
        icon={AccountCircleOutlined}
        activeIcon={AccountCircle}>
        Profile
      </MyNavLink>

      <Box
        sx={{
          mt: "auto",
          p: 1,
          maxWidth: "20rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          borderRadius: "100vh",
          "&:hover": {
            bgcolor: "background.paper"
          }
        }}>
        {isLoading ? (
          <CircularProgress color="primary" />
        ) : (
          <>
            <Avatar sx={{ bgcolor: "primary.main" }}>{initials}</Avatar>
            <Box mx={1}>
              <Typography>{data?.me?.name}</Typography>
              <Typography color="InactiveCaptionText" lineHeight={1}>
                @{data?.me?.username}
              </Typography>
            </Box>
            <MoreHoriz sx={{ ml: "auto" }} />
          </>
        )}
      </Box>
    </Box>
  );
};

export { LeftSidebar };
