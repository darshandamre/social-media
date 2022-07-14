import { useApolloClient } from "@apollo/client";
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
  Rocket,
  RocketOutlined
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  Typography
} from "@mui/material";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { useLogoutMutation, useMeQuery } from "../../generated/graphql";
import { stringAvatar } from "../../utils/stringAvatar";
import { useAlert } from "../alert";
import { CreateOrEditPostModal } from "../post";
import { MyNavLink } from "./MyNavLink";
import { NextLinkComposed } from "./NextLinkComposed";

const LeftSidebar = () => {
  const { data, loading } = useMeQuery();
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const [isLogoutMenuOpen, setIsLogoutMenuOpen] = useState(false);
  const anchorRef = useRef(null);
  const apolloClient = useApolloClient();
  const router = useRouter();
  const { showAlert } = useAlert();

  const closeLogoutMenu = () => {
    setIsLogoutMenuOpen(false);
  };

  const [logout] = useLogoutMutation({
    onError: () => {
      showAlert({
        message: "some error occured, please try again",
        severity: "error"
      });
      closeLogoutMenu();
    },
    onCompleted: data => {
      if (data.logout) {
        apolloClient.clearStore();
        closeLogoutMenu();
        router.push("/login");
      }
    }
  });

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
            component={NextLinkComposed}
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
                mx: "0.8rem",
                fontSize: "2.2rem",
                color: "primary.main"
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
          to={data?.me ? `/user/${data.me.username}` : "/login"}
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
          onClick={() => setIsCreatePostModalOpen(true)}>
          create post
        </Button>

        <Box mt="auto">
          {loading ? (
            <Box display="flex" alignItems="center" justifyContent="center">
              <CircularProgress color="primary" />
            </Box>
          ) : (
            <Box
              component={NextLinkComposed}
              to={`/user/${data?.me?.username}`}
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
              <IconButton
                ref={anchorRef}
                id="logout-button"
                aria-controls={isLogoutMenuOpen ? "logout-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={isLogoutMenuOpen ? "true" : undefined}
                onClick={e => {
                  e.preventDefault();
                  setIsLogoutMenuOpen(true);
                }}
                sx={{ ml: "auto" }}>
                <MoreHoriz />
              </IconButton>
              <Menu
                id="logout-menu"
                anchorEl={anchorRef.current}
                open={isLogoutMenuOpen}
                onClose={closeLogoutMenu}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left"
                }}
                transformOrigin={{
                  vertical: "bottom",
                  horizontal: "left"
                }}
                MenuListProps={{
                  "aria-labelledby": "logout-button"
                }}
                onClick={e => e.preventDefault()}>
                <MenuItem
                  onClick={e => {
                    e.preventDefault();
                    logout();
                  }}>
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Box>
      </Box>
      <CreateOrEditPostModal
        type="create"
        open={isCreatePostModalOpen}
        onClose={() => setIsCreatePostModalOpen(false)}
      />
    </>
  );
};

export { LeftSidebar };
