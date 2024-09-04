import { useMutation } from "@tanstack/react-query";
import { useStore } from "../store/useStore";
import { logInService } from "../services";

export const useLogIn = () => {
  const { setAccessToken } = useStore((state) => ({
    setAccessToken: state.setAccessToken,
  }));

  const loginMutation = useMutation({
    mutationFn: logInService,
    onSuccess: (data) => {
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
