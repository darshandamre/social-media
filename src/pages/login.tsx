import { NextPage } from "next";
import { AuthPagesLayout, Login } from "../features/auth";

const LoginPage: NextPage = () => {
  return (
    <AuthPagesLayout>
      <Login />
    </AuthPagesLayout>
  );
};

export default LoginPage;
