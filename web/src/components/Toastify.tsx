import styled from "styled-components";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export const Toastify = styled(ToastContainer).attrs({
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  icon: false,
  className: "CLASS_NAME",
  toastClassName: "TOAST_CLASS_NAME",
  bodyClassName: "BODY_CLASS_NAME",
  progressClassName: "PROGRESS_CLASS_NAME",
})`
  .TOAST_CLASS_NAME {
    margin-top: 30px;
    border-radius: 5px;
    min-height: 10px;
    padding: 10px 15px;
    background-color: #ffffff;
    color: #757575;
    border: 1px solid #757575;
  }
  .BODY_CLASS_NAME {
    margin: 0;
    font-size: 14px;
  }
  .Toastify__toast--success {
    background: ${({ theme }) => theme.positive};
  }
  .Toastify__toast--error {
    background: ${({ theme }) => theme.warn};
  }
`;
