import { useQuery } from "@tanstack/react-query";
import { currentUserService } from "../services";

export const useCurrentUser = () => {
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

  return {
    user,
    isLoading,
    isError,
    error,
  };
};
