import useAuth from "~/utils/hooks/useAuth";

export function Permission({ children, required }) {
  const { user } = useAuth();

  return (
    user?.permissions?.some(
      (permission) => required?.indexOf(permission) >= 0
    ) && children
  );
}
