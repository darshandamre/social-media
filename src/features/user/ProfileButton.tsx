import { Button, ButtonProps } from "@mui/material";
import { useReducer } from "react";
import {
  useFollowMutation,
  useMeQuery,
  UserQuery,
  useUnfollowMutation
} from "../../generated/graphql";
import { EditProfileModal } from "./EditProfileModal";

type ProfileButtonProps = {
  user: NonNullable<UserQuery["user"]>;
};

type ProfileActions = "Follow" | "Following" | "Unfollow" | "Edit Profile";

const ProfileButton = ({ user }: ProfileButtonProps) => {
  const { data } = useMeQuery();
  const isMyProfile = data?.me?.id === user.id;

  const [showModal, toggleModal] = useReducer(s => !s, false);

  const [follow] = useFollowMutation();
  const [unfollow] = useUnfollowMutation();

  let buttonVariant: ButtonProps["variant"] = "contained";
  let buttonColor: ButtonProps["color"];
  let buttonText: ProfileActions = "Follow";
  let buttonAction: ButtonProps["onClick"] = () =>
    follow({ variables: { followId: user.id } });

  if (isMyProfile) {
    buttonVariant = "outlined";
    buttonText = "Edit Profile";
    buttonAction = toggleModal;
  } else if (user.amIFollowingThem) {
    buttonVariant = "outlined";
    buttonColor = "error";
    buttonText = "Unfollow";
    buttonAction = () => unfollow({ variables: { unfollowId: user.id } });
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
      {showModal ? (
        <EditProfileModal
          open={showModal}
          handleClose={toggleModal}
          user={user}
        />
      ) : null}
    </>
  );
};

export { ProfileButton };
