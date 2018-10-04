import RenderAuthorized from '@/components/Authorized';
import { getAuthToken } from './authentication';

const AuthToken = () => (getAuthToken() ? 'loggedIn' : null);
let Authenticated = RenderAuthorized(AuthToken); // eslint-disable-line

// Reload the rights component
const reloadAuthenticated = () => {
  Authenticated = RenderAuthorized(AuthToken);
};

export { reloadAuthenticated };
export default Authenticated;
