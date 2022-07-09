import { NextPage } from "next";
import { AuthPagesLayout, Register } from "../features/auth";

const RegisterPage: NextPage = () => {
  return (
    <AuthPagesLayout>
      <Register />
    </AuthPagesLayout>
  );
};

export default RegisterPage;
