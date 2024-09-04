import { useMutation } from "@tanstack/react-query";
import { useStore } from "../store/useStore";
import { addCoinService } from "../services";

export const useCoins = () => {
  const { user, setUser } = useStore((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));

  const addCoinsMutation = useMutation({
    mutationFn: (amount) => addCoinService(user.login, amount),
    onSuccess: (newCoinCount) => {
      const newUser = { ...user, coins: newCoinCount };
      setUser(newUser);
    },
  });

  const addCoins = (amount) => {
    addCoinsMutation.mutate(amount);
  };

  return {
    addCoins,
    isLoading: addCoinsMutation.isLoading,
    isError: addCoinsMutation.isError,
    error: addCoinsMutation.error,
  };
};
