import { useMutation } from "@tanstack/react-query";
import { useStore } from "../store/useStore";
import { signUp } from "../services";

export const useSignUp = () => {
  const { setUser, setToken } = useStore((state) => ({
    setUser: state.setUser,
    setToken: state.setToken,
  }));

  const signUpMutation = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      setUser(data.user);
      setToken(data.token);
    },
  });

  return {
    signUp: signUpMutation.mutateAsync,
    isLoading: signUpMutation.isLoading,
    isError: signUpMutation.isError,
    error: signUpMutation.error,
  };
};
