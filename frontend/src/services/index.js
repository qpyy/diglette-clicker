import $api from "../http";

export const signUp = async (signUpData) => {
  const response = await $api.post(`/registration`, signUpData);

  return response.data;
};
