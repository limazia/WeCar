import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@utils/hooks/useAuth";

interface PermissionProps {
  children?: ReactNode;
  required: string[];
}

interface RedirectPermissionProps {
  required: string[];
}

export function Permission({ children, required }: PermissionProps) {
  const { user } = useAuth();
  const permissions = user?.group?.permissions;
  const hasRequiredPermissions =
    permissions &&
    (permissions.includes("admin") ||
      permissions.some((permission) => required.includes(permission)));

  if (hasRequiredPermissions) {
    return children;
  }
}

export function RedirectPermission({ required }: RedirectPermissionProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const permissions = user?.group?.permissions;

  useEffect(() => {
    const hasRequiredPermissions =
      permissions &&
      (permissions.includes("admin") ||
        permissions.some((permission) => required.includes(permission)));

    if (!hasRequiredPermissions) {
      navigate("/admin/");
    }
  }, [permissions, required, navigate]);

  return <></>;
}
