import $api from "../http";

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

const addCoinService = async (login, coin) => {
  const response = await $api.post(`/user/coins/add`, { login, coin });

  return response.data;
};

const currentUserService = async () => {
  const response = await $api.get(`/user/me`);

  return response.data;
};

export { logInService, signUpService, refreshTokenService, addCoinService, currentUserService };
