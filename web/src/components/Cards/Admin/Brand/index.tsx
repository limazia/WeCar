import { Link } from "react-router-dom";
import { Pencil, Trash } from "@phosphor-icons/react";

import { Brand } from "@shared/interfaces";

import { Button } from "@components/Forms/Button";
import { Spinner } from "@components/Spinner";
import { Permission } from "@components/Permission";
import { BrandLogo } from "@components/BrandLogo";

interface BrandCardProps {
  item: Brand;
  loading: boolean;
  handleDeleteClick: (item: Brand) => void;
}

export function BrandCard({
  item,
  loading,
  handleDeleteClick,
}: BrandCardProps) {
  return (
    <div className="card card-brands">
      <BrandLogo
        brand_slug={item.brand_slug}
        className="card-img-top brand-logo"
      />
      <div className="card-body">
        <div>
          <h5>{item.brand_name}</h5>
          <small className="text-muted">{item.brand_slug}</small>
        </div>
      </div>

      <Permission required={["brands.update", "brands.delete"]}>
        <div className="card-footer">
          <div className="row">
            <Permission required={["brands.update"]}>
              <div className="col">
                <Link
                  className="btn btn-edit btn-block"
                  to={`/admin/brands/update/${item.brand_id}`}
                >
                  <Pencil size={20} />
                </Link>
              </div>
            </Permission>

            <Permission required={["brands.delete"]}>
              <div className="col">
                <Button
                  className="btn btn-delete btn-block"
                  disabled={loading}
                  onClick={() => handleDeleteClick(item)}
                >
                  {loading ? <Spinner /> : <Trash size={20} />}
                </Button>
              </div>
            </Permission>
          </div>
        </div>
      </Permission>
    </div>
  );
}
