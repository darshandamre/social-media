import { Route, Routes } from "react-router-dom";
import { AuthPagesLayout } from "./components/AuthPagesLayout";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Register } from "./components/Register";

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
