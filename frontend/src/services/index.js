import $api from "../http";

const signUpService = async (signUpData) => {
  const response = await $api.post(`/registration`, signUpData);

  return response.data;
};

const logInService = async (loginData) => {
  const response = await $api.post(`/authorization`, loginData);

  return response.data;
};

const refreshAccessToken = async (refreshToken) => {
  const response = await $api.post(`/auth/refresh`, { refreshToken });

  return response.data;
};

export { logInService, signUpService, refreshAccessToken };
