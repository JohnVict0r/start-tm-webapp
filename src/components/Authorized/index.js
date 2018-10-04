import RenderAuthorized from './Authorized';
import RenderAuthorizedRoute from './AuthorizedRoute';
import RenderSecured from './Secured';
import CheckPermissions from './CheckPermissions';

/**
 * use  authority or getAuthority
 * @param {string|()=>String} currentAuthority
 */
const renderAuthorize = currentAuthority => {
  const check = CheckPermissions(currentAuthority);

  const Authorized = RenderAuthorized(check);

  Authorized.AuthorizedRoute = RenderAuthorizedRoute(Authorized);
  Authorized.Secured = RenderSecured(check);
  Authorized.check = check;

  return Authorized;
};

export default renderAuthorize;
