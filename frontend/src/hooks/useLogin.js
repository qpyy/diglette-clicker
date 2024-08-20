import { useMutation } from "@tanstack/react-query";
import { useStore } from "../store/useStore";
import { logInService } from "../services";

export const useLogIn = () => {
  const { setUser, setAccessToken } = useStore((state) => ({
    setUser: state.setUser,
    setAccessToken: state.setAccessToken,
  }));

  const loginMutation = useMutation({
    mutationFn: logInService,
    onSuccess: (data) => {
      setUser(data.user);
      setAccessToken(data.accessToken);
    },
  });

  return {
    logIn: loginMutation.mutateAsync,
    isLoading: loginMutation.isLoading,
    isError: loginMutation.isError,
    error: loginMutation.error,
  };
};
