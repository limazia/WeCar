import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CarSimple, Cards, CaretDown } from "@phosphor-icons/react";

import { Brand, Model } from "@utils/interfaces";
import { BrandService } from "@utils/services/BrandService";
import { ModelService } from "@utils/services/ModelService";

import { OutsideWrapper } from "./OutsideWrapper";
import { BrandLogo } from "./BrandLogo";

export function Search() {
  const location = useLocation();
  const navigate = useNavigate();

  const [brands, setBrands] = useState<Brand[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [isBrandDropdownOpen, setIsBrandDropdownOpen] = useState(false);
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);

  useEffect(() => {
    loadBrands();
  }, []);

  useEffect(() => {
    setIsBrandDropdownOpen(false);
    setIsModelDropdownOpen(false);
    setSelectedModel(null);
  }, [selectedBrand]);

  useEffect(() => {
    setIsBrandDropdownOpen(false);
    setIsModelDropdownOpen(false);
    setSelectedBrand(null);
    setSelectedModel(null);
  }, [location]);

  useEffect(() => {
    if (selectedBrand) {
      loadModelsByBrand(selectedBrand);
    }
  }, [selectedBrand]);

  const handleBrandClick = (brand: Brand) => {
    setSelectedBrand(brand);
    setIsBrandDropdownOpen(false);
  };

  const handleModelClick = (model: Model) => {
    setSelectedModel(model);
    setIsModelDropdownOpen(false);
  };

  const handleNavigate = () => {
    const brand = selectedBrand?.brand_slug;
    const model = selectedModel?.model_slug;
    let path = "/store";

    if (brand) {
      path += `/${brand}`;
    }

    if (model) {
      path += `/${model}`;
    }

    navigate(path);
  };

  async function loadBrands() {
    try {
      const { results } = await BrandService.list();

      setBrands(results);
    } catch (error) {
      console.error("Error loading brands:", error);
    }
  }

  async function loadModelsByBrand(brand: Brand) {
    try {
      const { brand_slug } = brand;
      const { results } = await ModelService.findModelsByBrandSlug({ brand_slug });

      setModels(results);
    } catch (error) {
      console.error("Error loading models:", error);
    }
  }

  return (
    <div>
      <div className="row d-flex align-items-center">
        <div className="col-md-4">
          <OutsideWrapper onClickOutside={() => setIsBrandDropdownOpen(false)}>
            {isBrandDropdownOpen && (
              <div className="card card-select-brand">
                <div className="card-body">
                  {brands.length > 0 ? (
                    <>
                      {brands.map((brand, index) => (
                        <span
                          key={`brand-${index}`}
                          className="item"
                          onClick={() => handleBrandClick(brand)}
                        >
                          {brand.brand_name}{" "}
                          <BrandLogo brand_slug={brand.brand_slug} size={30} />
                        </span>
                      ))}
                    </>
                  ) : (
                    <span>Nenhuma marca encontrada</span>
                  )}
                </div>
              </div>
            )}

            <div
              className="card card-search"
              onClick={() => setIsBrandDropdownOpen(!isBrandDropdownOpen)}
            >
              <div className="card-body">
                <div className="icon brand">
                  <Cards size={25} />
                </div>
                <div className="options">
                  <div className="title-box">
                    <span className="title">Marca</span>
                    <CaretDown size={10} weight="bold" />
                  </div>
                  <span className="item">
                    {selectedBrand?.brand_name || "Escolher marca"}
                  </span>
                </div>
              </div>
            </div>
          </OutsideWrapper>
        </div>

        <div className="col-md-5">
          <OutsideWrapper onClickOutside={() => setIsModelDropdownOpen(false)}>
            {isModelDropdownOpen && (
              <div className="card card-select-model">
                <div className="card-body">
                  {models.length > 0 ? (
                    <>
                      {models.map((model, index) => (
                        <span
                          key={`model-${index}`}
                          className="item"
                          onClick={() => handleModelClick(model)}
                        >
                          {model.model_name}
                        </span>
                      ))}
                    </>
                  ) : (
                    <span>Nenhum modelo encontrado</span>
                  )}
                </div>
              </div>
            )}

            <div
              className={`card card-search ${
                selectedBrand ? "" : "disabled"
              }`.trim()}
              onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
            >
              <div className="card-body">
                <div className="icon model">
                  <CarSimple size={25} />
                </div>
                <div className="options">
                  <div className="title-box">
                    <span className="title">Modelo</span>
                    <CaretDown size={10} weight="bold" />
                  </div>
                  <span className="item">
                    {selectedModel?.model_name || "Escolher modelo"}
                  </span>
                </div>
              </div>
            </div>
          </OutsideWrapper>
        </div>

        <div className="col-md-3">
          <button className="btn btn-explore-now" onClick={handleNavigate}>
            Explorar agora
          </button>
        </div>
      </div>
    </div>
  );
}
