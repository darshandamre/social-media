import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useMeQuery } from "../../generated/graphql";

const RequireAuth = () => {
  const { data, loading } = useMeQuery();
  const location = useLocation();

  const isAuth = loading || !!data?.me?.id;

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export { RequireAuth };
