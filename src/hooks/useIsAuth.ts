import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMeQuery } from "../generated/graphql";

export const useIsAuth = () => {
  const { data, loading } = useMeQuery();
  const router = useRouter();
  useEffect(() => {
    if (!loading && !data?.me) {
      router.replace("/login?from=" + router.asPath);
    }
  }, [router, loading, data?.me]);

  return {
    authLoading: loading,
    isAuth: !!data?.me
  };
};
