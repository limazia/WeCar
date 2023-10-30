import { useAuth } from "@shared/hooks/useAuth";

type ValidateParams = {
  required: string[];
}

export function validateUserPermissions({ required, }: ValidateParams) {
  const { user } = useAuth();

  if (required?.length > 0) {
    const permissions = user?.permissions;
    const hasRequiredPermissions =
      permissions &&
      (permissions.includes("admin") ||
        permissions.some((permission) => required.includes(permission)));

    if (!hasRequiredPermissions) {
      return false;
    }
  }

  return true;
}
