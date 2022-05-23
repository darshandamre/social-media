import { ArrowBack } from "@mui/icons-material";
import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { UserQuery } from "../../app/api/generated/graphql";
import { MyTextField } from "../common";

type EditProfileModalProps = {
  open: boolean;
  handleClose: () => void;
  user: NonNullable<UserQuery["user"]>;
};

type EditProfileFormData = {
  name: string;
  bio: string;
  portfolioLink: string;
};

const EditProfileModal = ({
  open,
  handleClose,
  user
}: EditProfileModalProps) => {
  const { name, bio, portfolioLink } = user;
  const {
    control,
    handleSubmit,
    setError,
    setValue,
    formState: { isSubmitting }
  } = useForm<EditProfileFormData>({
    defaultValues: {
      name: name ?? "",
      bio: bio ?? "",
      portfolioLink: portfolioLink ?? ""
    }
  });

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
        <Box bgcolor="background.paper" p="1rem" width="30rem" maxWidth="90%">
          <Box display="flex" alignItems="center">
            <IconButton onClick={handleClose}>
              <ArrowBack />
            </IconButton>

            <Typography variant="h5" mx="1rem">
              Edit Profile
            </Typography>

            <Button
              sx={{
                ml: "auto",
                borderRadius: "100vw",
                fontWeight: "600"
              }}
              variant="contained">
              Save
            </Button>
          </Box>

          <MyTextField control={control} name="name" label="name" />
          <MyTextField multiline control={control} name="bio" label="bio" />
          <MyTextField
            control={control}
            name="portfolioLink"
            label="portfolio link"
          />
        </Box>
      </Modal>
    </>
  );
};

export { EditProfileModal };
