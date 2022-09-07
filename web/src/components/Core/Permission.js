import useAuth from "~/hooks/useAuth";

export function Permission({ children, required }) {
  const { user } = useAuth();
  const { permissions } = user;

  //return (permissions.some((permission) => required.indexOf(permission) >= 0) && <>{children}</>);
  //return permissions.some(r => required.includes(r))
  return (
    permissions.some((permission) => required.indexOf(permission) >= 0) &&
    children
  );
}
