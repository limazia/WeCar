import { ArrowsClockwise, Plus } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

import { Permission } from "./Permission";

interface ActionButtonsProps {
  label?: string;
  to?: string;
  permission?: string[];
  onRefreshClick?: () => void;
}

export function ActionButtons({
  label,
  to = "/",
  permission = [],
  onRefreshClick,
}: ActionButtonsProps) {
  return (
    <div className="d-flex">
      {onRefreshClick && (
        <button className="btn btn-link" onClick={onRefreshClick}>
          <ArrowsClockwise size={20} />
        </button>
      )}

      {permission.length > 0 && (
        <Permission required={permission}>
          <Link className="btn btn-primary-w" to={to}>
            <Plus size={20} className="mr-1" /> {label}
          </Link>
        </Permission>
      )}
    </div>
  );
}
