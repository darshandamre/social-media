import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { LeftSidebar } from "./LeftSidebar";

const Layout = () => {
  return (
    <Box height="100%">
      <LeftSidebar />
      <Outlet />
      {/* right sidebar */}
    </Box>
  );
};

export { Layout };
