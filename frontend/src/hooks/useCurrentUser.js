import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useStore } from "../store/useStore";
import { currentUserService } from "../services";

export const useCurrentUser = () => {
  const { setUser } = useStore();

  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: currentUserService,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user]);

  return {
    user,
    isLoading,
    isError,
    error,
  };
};
