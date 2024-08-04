import $api from "../http";

export const signUpService = async (signUpData) => {
  const response = await $api.post(`/registration`, signUpData);

  return response.data;
};
