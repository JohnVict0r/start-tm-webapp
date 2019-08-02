import { stringify } from 'qs';
import { callApi } from '@/utils/callApi';
import schema from './Schema';

export const subscription = data => callApi(`subscriptions`).post(data);

export const login = credentials => callApi(`sessions`).post(credentials);

export const loginWithSabia = query => callApi(`auth/callback/sabia?${stringify(query)}`).get();

export const validateEmail = email => callApi(`auth/signup/email/validation/${email}`).get();

export const forgotPassword = ({ email }) => callApi(`auth/forgot-password`).post({ email });

export const resetPassword = ({ token, email, password, passwordConfirmation }) =>
  callApi(`auth/reset-password`).post({
    token,
    email,
    password,
    password_confirmation: passwordConfirmation,
  });

export const fetchRoles = () => callApi(`roles`, schema.ROLE_ARRAY).get();
