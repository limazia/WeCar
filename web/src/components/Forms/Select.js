import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select, { components } from "react-select";

import { getBrands, getModels } from "~/utils/services/api";
import { CustomGroupHeading, customStyles } from "~/utils/misc/selectTypes";

export function SelectWrapper({ forcePosition }) {
  const navigate = useNavigate();
  const [selectValue, setSelectValue] = useState("");
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [position, setPosition] = useState(true);

  useEffect(() => {
    loadBrands();
    loadModels();
  }, []);

  const loadBrands = async () => {
    const { results } = await getBrands();

    setBrands(
      results.map((brand) => ({
        label: brand.brand_name.toUpperCase(),
        value: brand.brand_slug,
      }))
    );
  };

  const loadModels = async () => {
    const { results } = await getModels();

    setModels(
      results.map((model) => ({
        label: model.model_name.toUpperCase(),
        value: `${model.brand_slug}/${model.model_slug}`,
      }))
    );
  };

  let oldScrollY = 0;

  const controlDirection = () => {
    if (window.scrollY > oldScrollY) {
      setPosition(false);
    } else {
      setPosition(true);
    }

    oldScrollY = window.scrollY;
  };

  useEffect(() => {
    const { brand, value } = selectValue;

    if (brand) {
      navigate(`/buy/${brand}/${value}`);
    } else if (value) {
      navigate(`/buy/${value}`);
    }
  }, [selectValue]);

  useEffect(() => {
    window.addEventListener("scroll", controlDirection);

    return () => {
      window.removeEventListener("scroll", controlDirection);
    };
  }, []);

  const groupedOptions = [
    {
      label: "Marca",
      options: brands,
    },
    {
      label: "Modelo",
      options: models,
    },
  ];

  const onSelectChange = (event) => {
    if (event) {
      setSelectValue(event);
    }
  };

  const NoOptionsMessage = (props) => {
    return (
      <components.NoOptionsMessage {...props}>
        <span className="custom-css-class">
          Nenhum carro ou marca foi encontrado
        </span>
      </components.NoOptionsMessage>
    );
  };

  return (
    <Select
      placeholder="Digite a marca ou modelo do carro e selecione"
      styles={customStyles}
      menuPortalTarget={document.body}
      menuPlacement={forcePosition ? forcePosition : position ? "top" : "auto"}
      onChange={onSelectChange}
      options={groupedOptions}
      components={{
        GroupHeading: CustomGroupHeading,
        DropdownIndicator: () => null,
        IndicatorSeparator: () => null,
        NoOptionsMessage,
      }}
    />
  );
}
