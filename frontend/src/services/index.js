import $api from "../http";
import { useStore } from "../store/useStore";

const signUpService = async (signUpData) => {
  const response = await $api.post(`/registration`, signUpData);

  return response.data;
};

const logInService = async (loginData) => {
  const response = await $api.post(`/authorization`, loginData);

  return response.data;
};

const refreshTokenService = async () => {
  const response = await $api.get(`/auth/refresh`);

  return response.data.accessToken;
};

const currentUserService = async () => {
  const { setUser } = useStore.getState();

  try {
    const response = await $api.get(`/user/me`);
    setUser(response.data);
    return response.data;
  } catch (error) {
    console.error("Ошибка получения пользователя:", error);
    throw error;
  }
};

const getUserByLoginService = async (login) => {
  const response = await $api.get(`/user/${login}`);

  return response.data;
};

const addCoinService = async (login, coin) => {
  const response = await $api.post(`/user/coins/add`, { login, coin });

  return response.data;
};

export {
  logInService,
  signUpService,
  refreshTokenService,
  addCoinService,
  currentUserService,
  getUserByLoginService,
};
