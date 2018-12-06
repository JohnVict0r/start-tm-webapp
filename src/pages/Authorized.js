import React from 'react';
import RenderAuthorized from '@/components/Authorized';
import { getAuthority } from '@/utils/authority';
import { getRouteAuthority } from '@/utils/utils';
import Redirect from 'umi/redirect';

const Authority = getAuthority();
const Authorized = RenderAuthorized(Authority);

export default ({ children, location: { pathname }, route }) => {
  const routerConfig = getRouteAuthority(pathname, [route]);
  return (
    <Authorized authority={routerConfig} noMatch={<Redirect to="/exception/403" />}>
      {children}
    </Authorized>
  );
};
