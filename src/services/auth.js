import callApi from '@/utils/callApi';

export const signup = async user => callApi(`auth/signup`).post(user);
export const login = credentials => callApi(`auth/login`).post(credentials);
export const validateEmail = async email => callApi(`auth/signup/email/validation/${email}`).get();
export const forgotPassword = async email => callApi(`auth/forgot-password`).post({ email });

export const resetPassword = async ({ token, email, password, passwordConfirmation }) =>
  callApi(`auth/reset-password`).post({
    token,
    email,
    password,
    password_confirmation: passwordConfirmation,
  });
