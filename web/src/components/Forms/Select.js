import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select, { components } from "react-select";

import WebRepository from "~/services/WebRepository";

export function SelectWrapper({ forcePosition }) {
  const navigate = useNavigate();
  const [result, setResult] = useState([]);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [position, setPosition] = useState(true);

  useEffect(() => {
    loadBrands();
    loadModels();
  }, []);

  const loadBrands = async () => {
    const { results } = await WebRepository.getBrands();

    setBrands(
      results.map((brand) => ({
        value: brand.brand_slug,
        label: brand.brand_name,
      }))
    );
  };

  const loadModels = async () => {
    const { results } = await WebRepository.GetModels();

    setModels(
      results.map((model) => ({
        value: `${model.brand_slug}/${model.model_slug}`,
        label: model.model_name,
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
    if (result.brand) {
      navigate(`/buy/car/${result.brand}/${result.value}`);
    } else if (result.value) {
      navigate(`/buy/car/${result.value}`);
    }
  }, [result]);

  useEffect(() => {
    window.addEventListener("scroll", controlDirection);

    return () => {
      window.removeEventListener("scroll", controlDirection);
    };
  }, []);

  const brandOptions = [
    { value: "chevrolet", label: "Chevrolet" },
    { value: "volkswagen", label: "Volkswagen" },
    { value: "mercedes", label: "Mercedes Benz" },
  ];

  const modelOptions = [
    { value: "onix", brand: "chevrolet", label: "Onix" },
    { value: "jetta", brand: "volkswagen", label: "Jetta" },
    { value: "c180", brand: "mercedes", label: "Mercedes-benz C 180" },
  ];

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

  const handleHeaderClick = (id) => {
    const node = document.querySelector(`#${id}`).parentElement
      .nextElementSibling;
    const classes = node.classList;
    if (classes.contains("collapsed")) {
      node.classList.remove("collapsed");
    } else {
      node.classList.add("collapsed");
    }
  };

  const CustomGroupHeading = (props) => {
    return (
      <div
        className="group-heading-wrapper"
        onClick={() => handleHeaderClick(props.id)}
      >
        <components.GroupHeading {...props} />
      </div>
    );
  };

  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      borderBottom: "1px dotted pink",
      color: state.selectProps.menuColor,
      padding: 20,
    }),

    control: (_, { selectProps: { width } }) => ({
      display: "flex",
      alignItems: "center",
      height: "60px",
      textIndent: "10px",
      background: "#e9ebef",
      color: "#637089",
      border: "none",
      maxMidth: "100%",
      borderRadius: "10px",
    }),

    menuPortal: (base) => ({ ...base, zIndex: 9999 }),

    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";

      return { ...provided, opacity, transition };
    },
  };

  const handleChange = (selectedOption) => {
    if (selectedOption) {
      setResult(selectedOption);
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
      styles={customStyles}
      menuPortalTarget={document.body}
      menuPlacement={forcePosition ? forcePosition : position ? "top" : "auto"}
      placeholder="Digite a marca ou modelo do carro e selecione"
      onChange={(value) => handleChange(value)}
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
