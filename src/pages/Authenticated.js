import React from 'react';
import RenderAuthorized from '@/components/Authorized';
import Redirect from 'umi/redirect';
import { getAuthToken } from '@/utils/authentication';

const Authorized = RenderAuthorized('');

const isLoggedIn = () => !!getAuthToken();

export default ({ children }) => (
  <Authorized authority={isLoggedIn} noMatch={<Redirect to="/auth/login" />}>
    {children}
  </Authorized>
);
