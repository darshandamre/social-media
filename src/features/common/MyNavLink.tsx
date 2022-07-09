import { Box, SvgIcon, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { NextLinkComposed } from "./NextLinkComposed";

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
  const router = useRouter();
  const isActive = router.asPath === to;
  const CurrentIcon = isActive ? activeIcon ?? icon : icon;

  return (
    <Box display="flex">
      <Box
        component={NextLinkComposed}
        to={to}
        sx={{
          py: "0.5rem",
          textDecoration: "none",
          color: "inherit",
          display: "flex",
          alignItems: "center",
          borderRadius: "100vh",
          "&:hover": {
            bgcolor: "background.paper"
          }
        }}>
        {CurrentIcon ? (
          <CurrentIcon
            sx={{
              mx: "1rem",
              fontSize: "1.8rem"
            }}
          />
        ) : null}
        {/* mx: 0.5rem smaller screens */}
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: isActive ? 600 : 400,
            mr: "1.2rem"
            // display: "none" //smaller screens
          }}>
          {children}
        </Typography>
      </Box>
    </Box>
  );
};
