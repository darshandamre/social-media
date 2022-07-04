import { Button, ButtonProps } from "@mui/material";
import { useReducer } from "react";
import { useMeQuery, UserQuery } from "../../generated/graphql";
import {
  useFollowMutationAndUpdateCache,
  useUnFollowMutationAndUpdateCache
} from "../../hooks";
import { EditProfileModal } from "./EditProfileModal";

type ProfileButtonProps = {
  user: NonNullable<UserQuery["user"]>;
};

type ProfileActions = "Follow" | "Following" | "Unfollow" | "Edit Profile";

const ProfileButton = ({ user }: ProfileButtonProps) => {
  const { data } = useMeQuery();
  const isMyProfile = data?.me?.id === user.id;

  const [showModal, toggleModal] = useReducer(s => !s, false);

  const [follow] = useFollowMutationAndUpdateCache({
    variables: { followId: user.id }
  });
  const [unfollow] = useUnFollowMutationAndUpdateCache({
    variables: { unfollowId: user.id }
  });

  let buttonVariant: ButtonProps["variant"] = "contained";
  let buttonColor: ButtonProps["color"];
  let buttonText: ProfileActions = "Follow";
  let buttonAction: ButtonProps["onClick"] = () => follow();

  if (isMyProfile) {
    buttonVariant = "outlined";
    buttonText = "Edit Profile";
    buttonAction = toggleModal;
  } else if (user.amIFollowingThem) {
    buttonVariant = "outlined";
    buttonColor = "error";
    buttonText = "Unfollow";
    buttonAction = () => unfollow();
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
