import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select, { components } from "react-select";

import { getBrands, getModels } from "~/utils/services/api";

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
    const { results } = await getBrands();

    setBrands(
      results.map((brand) => ({
        value: brand.brand_slug,
        label: brand.brand_name.toUpperCase(),
      }))
    );
  };

  const loadModels = async () => {
    const { results } = await getModels();

    setModels(
      results.map((model) => ({
        value: `${model.brand_slug}/${model.model_slug}`,
        label: model.model_name.toUpperCase(),
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

  const handleChange = (selectedOption) => {
    if (selectedOption) {
      setResult(selectedOption);
    }
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
      backgroundColor: "#fff",
      color: "#637089",
      border: "2px solid #e9ebef",
      maxWidth: "100%",
      borderRadius: "10px",
      caretColor: "transparent",
    }),

    menuPortal: (base) => ({ ...base, zIndex: 9999 }),

    groupHeading: (base) => ({
      ...base,
      position: "sticky",
      top: "0",
    }),

    Group: (base) => ({
      ...base,
      position: "sticky",
      top: "0",
    }),

    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";

      return { ...provided, opacity, transition };
    },
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
      onChange={(v) => handleChange(v)}
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