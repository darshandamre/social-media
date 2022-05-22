import { Box, CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
      <CircularProgress color="primary" />
    </Box>
  );
};

export { Loader };
