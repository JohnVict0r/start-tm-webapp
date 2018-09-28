import React from 'react';
import Authenticated from '@/utils/Authenticated';
import Redirect from 'umi/redirect';

export default ({ children }) => (
  <Authenticated authority="loggedIn" noMatch={<Redirect to="/user/login" />}>
    {children}
  </Authenticated>
);
