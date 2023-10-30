import { groupRow } from "@shared/helpers/groupRow";

import { BrandLogo } from "@components/BrandLogo";
import { Brand } from "@shared/interfaces";

interface BrandModalProps {
  brands: Brand[];
  handleBrand: (brand: Brand) => void;
}

export function BrandModal({ brands, handleBrand }: BrandModalProps) {
  const brandItems = groupRow(brands);

  function handleClick(brand: Brand) {
    handleBrand(brand);

    const modalElement = document.getElementById("brandsModal");
    if (modalElement) {
      modalElement.click();
    }
  }

  return (
    <div className="modal modal-brand fade" id="brandsModal" tabIndex={-1} role="dialog">
      <div
        className="modal-dialog modal-lg modal-dialog-centered"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Marcas</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {brands.length > 0 ? (
              <>
                {brandItems.map((group, index) => (
                  <div
                    className={`row ${index !== 0 ? "mt-4" : "mt-0"}`}
                    key={index}
                  >
                    {group.map((brand) => (
                      <div
                        key={`brand-${brand.brand_id}`}
                        className="col-md-4"
                        onClick={() => handleClick(brand)}
                      >
                        <div className="box">
                          <div className="item">
                            <BrandLogo
                              brand_slug={brand.brand_slug}
                              size={60}
                            />
                            <span className="mt-3">{brand.brand_name}</span>
                          </div>
                        </div>{" "}
                      </div>
                    ))}
                  </div>
                ))}
              </>
            ) : (
              <span>Nenhuma marca encontrada</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
