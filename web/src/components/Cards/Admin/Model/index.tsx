import { Trash } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

import { Model } from "@shared/interfaces";

import { BrandLogo } from "@components/BrandLogo";
import { Button } from "@components/Forms/Button";
import { Permission } from "@components/Permission";

interface ModelCardProps {
  item: Model;
  loading: boolean;
  handleDeleteClick: (item: Model) => void;
}

export function ModelCard({
  item,
  loading,
  handleDeleteClick,
}: ModelCardProps) {
  return (
    <div className="card card-models">
      <BrandLogo
        brand_slug={item.brand_slug ? item.brand_slug : ""}
        className="card-img-top brand-logo"
      />
      <div className="card-body">
        <div>
          <h5>{item.model_name}</h5>
          <small className="text-muted">{item.model_slug}</small>
        </div>
      </div>

      <Permission required={["models.update", "models.delete"]}>
        <div className="card-footer">
          <Permission required={["models.update"]}>
            <Link
              className="btn btn-edit btn-block"
              to={`/admin/models/update/${item.model_id}`}
            >
              Editar
            </Link>
          </Permission>

          <Permission required={["models.delete"]}>
            <Button
              className="btn btn-delete btn-block"
              loading={loading}
              disabled={loading}
              onClick={() => handleDeleteClick(item)}
            >
              <Trash size={20} />
            </Button>
          </Permission>
        </div>
      </Permission>
    </div>
  );
}
