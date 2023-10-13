import { createPortal } from "react-dom/index";

function Modal({ children }) {
  return createPortal(children, document.getElementById("#modal"));
}

export default Modal;
