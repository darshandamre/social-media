import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowBack } from "@mui/icons-material";
import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
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

const userEditSchema = yup.object().shape({
  name: yup.string().trim().max(50, "name can't be more that 50 characters"),
  bio: yup.string().trim().max(200, "bio can't be more than 200 characters"),
  portfolioLink: yup
    .string()
    .trim()
    .max(100, "portfolio link can't be more than 100 characters")
});

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
    formState: { isSubmitting }
  } = useForm<EditProfileFormData>({
    defaultValues: {
      name: name ?? "",
      bio: bio ?? "",
      portfolioLink: portfolioLink ?? ""
    },
    resolver: yupResolver(userEditSchema)
  });

  const saveUser = handleSubmit(() => {
    //
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
        <Box
          component="form"
          onSubmit={saveUser}
          bgcolor="background.paper"
          p="1rem"
          width="30rem"
          maxWidth="90%"
          borderRadius={2}>
          <Box display="flex" alignItems="center" mb="1rem">
            <IconButton onClick={handleClose}>
              <ArrowBack />
            </IconButton>

            <Typography variant="h5" mx="1rem">
              Edit Profile
            </Typography>

            <Button
              type="submit"
              disabled={isSubmitting}
              variant="contained"
              sx={{
                ml: "auto",
                borderRadius: "100vw",
                fontWeight: "600"
              }}>
              Save
            </Button>
          </Box>

          <MyTextField control={control} name="name" label="name" />
          <MyTextField
            multiline
            minRows={3}
            control={control}
            name="bio"
            label="bio"
          />
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
