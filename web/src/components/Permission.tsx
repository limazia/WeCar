import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useCan } from "@shared/hooks/useCan";

interface PermissionProps {
  children?: ReactNode;
  required: string[];
}

interface RedirectPermissionProps {
  required: string[];
}

export function Permission({ children, required }: PermissionProps) {
  const userCanSeeComponent = useCan({ required });

  if (!userCanSeeComponent) {
    return null;
  }

  return <>{children}</>;
}

export function RedirectPermission({ required }: RedirectPermissionProps) {
  const navigate = useNavigate();
  const userCanSeeComponent = useCan({ required });

  useEffect(() => {
    if (!userCanSeeComponent) {
      navigate("/admin/");
    }
  }, [userCanSeeComponent, required, navigate]);

  return <></>;
}
