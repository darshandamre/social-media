import { Button, ButtonProps } from "@mui/material";
import { useReducer } from "react";
import { useMeQuery } from "../../app/api";
import { UserQuery } from "../../app/api/generated/graphql";
import { EditProfileModal } from "./EditProfileModal";

type ProfileButtonProps = {
  user: NonNullable<UserQuery["user"]>;
};

const ProfileButton = ({ user }: ProfileButtonProps) => {
  const { data } = useMeQuery();
  const isMyProfile = data?.me?.id === user.id;

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
      <EditProfileModal
        open={showModal}
        handleClose={toggleModal}
        user={user}
      />
    </>
  );
};

export { ProfileButton };
