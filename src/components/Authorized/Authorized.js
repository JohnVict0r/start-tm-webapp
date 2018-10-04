const Authorized = checkPermissions => ({ children, authority, noMatch = null }) => {
  const childrenRender = typeof children === 'undefined' ? null : children;
  return checkPermissions(authority, childrenRender, noMatch);
};

export default Authorized;
