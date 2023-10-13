import { Spinner } from "./Spinner";

import { ReactComponent as LogoImage } from "@assets/logo.svg";
import { ReactComponent as LogoIcon } from "@assets/logo-icon.svg";

interface LoadingProps {
  type?: "icon" | "logo" | "spinner" | "text";
}

function Logo() {
  return <LogoImage className="logo img-fluid" />;
}

function Icon() {
  return <LogoIcon className="icon img-fluid" />;
}

function Text() {
  const company = import.meta.env.VITE_APP_NAME;

  return <span>{company}</span>;
}

export function Loading({ type = "icon" }: LoadingProps) {
  return (
    <div className="container-fluid container-loading">
      <div className="row h-100 justify-content-center align-items-center">
        {type === "icon" && <Icon />}
        {type === "logo" && <Logo />}
        {type === "text" && <Text />}
        {type === "spinner" && <Spinner size="5em" color="dark" />}
      </div>
    </div>
  );
}
