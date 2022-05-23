import { Box, Button, ButtonProps, Modal } from "@mui/material";
import { useReducer } from "react";
import { useMeQuery } from "../../app/api";

type ProfileButtonProps = {
  userId: string;
};

const ProfileButton = ({ userId }: ProfileButtonProps) => {
  const { data } = useMeQuery();
  const isMyProfile = data?.me?.id === userId;

  const [showModal, toggleModal] = useReducer(s => !s, false);

  let buttonVariant: ButtonProps["variant"] = "contained";
  let buttonColor: ButtonProps["color"];
  let buttonText: string = "Follow";
  let buttonAction: ButtonProps["onClick"];

  if (isMyProfile) {
    buttonVariant = "outlined";
    buttonText = "Edit Profile";
    buttonAction = toggleModal;
  }

  return (
    <>
      <Button
        sx={{
          ml: "auto",
          mr: "0.5rem",
          mt: "2rem",
          borderRadius: "100vw",
          fontWeight: "600"
        }}
        variant={buttonVariant}
        color={buttonColor}
        onClick={buttonAction}>
        {buttonText}
      </Button>
      <Modal
        open={showModal}
        onClose={toggleModal}
        sx={({ palette }) => ({
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        })}>
        <Box bgcolor="background.paper">
          edit profile modal will appear here
        </Box>
      </Modal>
    </>
  );
};

export { ProfileButton };
