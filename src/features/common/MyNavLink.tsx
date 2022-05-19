import { Box, SvgIcon, Typography } from "@mui/material";
import { ReactNode } from "react";
import { Link, useMatch } from "react-router-dom";

interface MyNavLinkProps {
  children: ReactNode;
  to: string;
  icon?: typeof SvgIcon;
  activeIcon?: typeof SvgIcon;
}

export const MyNavLink = ({
  children,
  to,
  icon,
  activeIcon
}: MyNavLinkProps) => {
  const isActive = !!useMatch(to);
  const CurrentIcon = isActive ? activeIcon ?? icon : icon;

  return (
    <Box
      sx={{
        display: "flex",
        minWidth: 0
      }}>
      <Box
        component={Link}
        to={to}
        sx={{
          py: "0.5rem",
          pr: "1rem",
          textDecoration: "none",
          color: "inherit",
          display: "flex",
          alignItems: "center",
          borderRadius: "100vh",
          "&:hover": {
            bgcolor: "background.paper"
          }
        }}>
        {CurrentIcon ? <CurrentIcon sx={{ mx: "1rem" }} /> : null}
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: isActive ? 600 : 400
          }}>
          {children}
        </Typography>
      </Box>
    </Box>
  );
};
