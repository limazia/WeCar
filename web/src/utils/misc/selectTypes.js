import { components } from "react-select";

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

export const CustomGroupHeading = (props) => {
  return (
    <div
      className="group-heading-wrapper"
      onClick={() => handleHeaderClick(props.id)}
    >
      <components.GroupHeading {...props} />
    </div>
  );
};

export const customStyles = {
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

 