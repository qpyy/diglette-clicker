import { useMutation } from "@tanstack/react-query";
import { useStore } from "../store/useStore";
import { logInService } from "../services";

export const useLogIn = () => {
  const { setUser, setAccessToken, setRefreshToken } = useStore((state) => ({
    setUser: state.setUser,
    setAccessToken: state.setAccessToken,
    setRefreshToken: state.setRefreshToken,
  }));

  const loginMutation = useMutation({
    mutationFn: logInService,
    onSuccess: (data) => {
      setUser(data.user);
      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);
    },
  });

  return {
    logIn: loginMutation.mutateAsync,
    isLoading: loginMutation.isLoading,
    isError: loginMutation.isError,
    error: loginMutation.error,
  };
};
