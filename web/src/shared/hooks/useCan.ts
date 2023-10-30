import { validateUserPermissions } from "@shared/helpers/validateUserPermissions";
import { useAuth } from "./useAuth";

type UseCanParams = {
  required: string[];
};

export function useCan({ required }: UseCanParams) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return false;
  }

  const userHasValidPermissions = validateUserPermissions({ required });

  return userHasValidPermissions;
}
