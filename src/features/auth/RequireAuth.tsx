import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useMeQuery } from "src/app/api";

const RequireAuth = () => {
  const { data, isLoading } = useMeQuery();
  const location = useLocation();

  const isAuth = isLoading || !!data?.me?.id;

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export { RequireAuth };
