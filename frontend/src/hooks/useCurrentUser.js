import { useMutation } from "@tanstack/react-query";
import { useStore } from "../store/useStore";
import { currentUserService } from "../services";

export const useCurrentUser = () => {
  const { setUser } = useStore((state) => ({
    setUser: state.setUser,
  }));

  const currentUserMutation = useMutation({
    mutationFn: currentUserService,
    onSuccess: (user) => {
      setUser(user);
    },
  });

  return {
    getCurrentUser: currentUserMutation.mutateAsync,
    isLoading: currentUserMutation.isLoading,
    isError: currentUserMutation.isError,
    error: currentUserMutation.error,
  };
};
