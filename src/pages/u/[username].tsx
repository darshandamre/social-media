import { NextPage } from "next";
import { Layout } from "../../features/common";
import { Profile } from "../../features/user";

const ProfilePage: NextPage = () => {
  return (
    <Layout>
      <Profile />
    </Layout>
  );
};

export default ProfilePage;
