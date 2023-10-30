import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CaretDown, XCircle } from "@phosphor-icons/react";

import { Brand, Model } from "@shared/interfaces";
import { BrandService } from "@shared/services/BrandService";
import { ModelService } from "@shared/services/ModelService";

import { BrandModal, ModelModal } from "./Modal";

export function Search() {
  const location = useLocation();
  const navigate = useNavigate();

  const [brands, setBrands] = useState<Brand[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);

  useEffect(() => {
    loadBrands();
  }, []);

  useEffect(() => {
    setSelectedModel(null);
  }, [selectedBrand]);

  useEffect(() => {
    setSelectedBrand(null);
    setSelectedModel(null);
  }, [location]);

  useEffect(() => {
    if (selectedBrand) {
      loadModelsByBrand(selectedBrand);
    }
  }, [selectedBrand]);

  const handleBrand = (brand: Brand) => {
    setSelectedBrand(brand);
  };

  const handleModel = (model: Model) => {
    setSelectedModel(model);
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
    const { results } = await BrandService.list();

    setBrands(results);
  }

  async function loadModelsByBrand(brand: Brand) {
    const { brand_slug } = brand;
    const { results } = await ModelService.findModelsByBrandSlug(brand_slug);

    setModels(results);
  }

  return (
    <div className="search">
      <BrandModal brands={brands} handleBrand={handleBrand} />
      <ModelModal models={models} handleModel={handleModel} />

      <div
        className="search-brands"
        data-toggle="modal"
        data-target="#brandsModal"
      >
        <div className="options">
          <div className="title-box">
            <span className="title">Marca</span>
            <CaretDown size={10} weight="bold" />
          </div>
          <div className="item">
            <span>{selectedBrand?.brand_name || "Escolher marca"}</span>

            {selectedBrand && (
              <XCircle size={16} onClick={() => setSelectedBrand(null)} />
            )}
          </div>
        </div>
      </div>

      <div
        className={`search-models ${selectedBrand ? "" : "disabled"}`.trim()}
        data-toggle="modal"
        data-target="#modelsModal"
      >
        <div className="options">
          <div className="title-box">
            <span className="title">Modelo</span>
            <CaretDown size={10} weight="bold" />
          </div>
          <div className="item">
            <span>{selectedModel?.model_name || "Escolher modelo"}</span>

            {selectedModel && (
              <XCircle size={16} onClick={() => setSelectedModel(null)} />
            )}
          </div>
        </div>
      </div>

      <button className="btn btn-explore-now" onClick={handleNavigate}>
        Explorar agora
      </button>
    </div>
  );
}
