import { Route, Routes } from "react-router-dom";
import { AuthPagesLayout, Login, Register } from "./features/auth";
import { Home } from "./features/common";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/" element={<AuthPagesLayout />}>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
};

export { App };
