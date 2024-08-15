import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useStore } from "../store/useStore";
import { addCoinService } from "../services";

export const useCoins = () => {
  const { user, setUser } = useStore((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));

  const queryClient = useQueryClient();

  const addCoinsMutation = useMutation({
    mutationFn: (amount) => addCoinService(user.login, amount),
    onSuccess: (newCoinCount) => {
      const updatedUser = { ...user, coins: newCoinCount };
      setUser(updatedUser);
      queryClient.invalidateQueries(["user"]);
    },
  });

  const addCoins = (amount) => {
    addCoinsMutation.mutate(amount);
  };

  return {
    coins: user.coins,
    addCoins,
    isLoading: addCoinsMutation.isLoading,
    isError: addCoinsMutation.isError,
    error: addCoinsMutation.error,
  };
};
