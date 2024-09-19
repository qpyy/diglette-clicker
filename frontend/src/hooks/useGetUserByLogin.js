import { useQuery } from "@tanstack/react-query";
import { getUserByLoginService } from "../services";

export const useGetUserByLogin = (login) => {
  const {
    data: otherUser,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["user", login],
    queryFn: () => getUserByLoginService(login),
    enabled: !!login,
    refetchOnWindowFocus: false,
  });

  return {
    otherUser,
    isLoading,
    isError,
    error,
  };
};
