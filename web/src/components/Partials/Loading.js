import { Logo as LogoImage, LogoIcon, Splash } from "../Images";

function Logo() {
  return <LogoImage className="logo img-fluid" />;
}

function Icon() {
  return <LogoIcon className="icon img-fluid" />;
}

function Animated() {
  return <img src={Splash} className="animated img-fluid" />;
}

function Spinner() {
  return (
    <div className="spinner-border" style={{ width: "3rem", height: "3rem" }}>
      <span className="sr-only">Carregando...</span>
    </div>
  );
}

function Text() {
  return <h1>{process.env.REACT_APP_NAME || "Carregando..."}</h1>;
}

export function Loading({ type = "icon" }) {
  const allowedScopes = ["icon", "logo", "text", "animated", "spinner"];

  return (
    <div className="container-fluid container-loading">
      <div className="row h-100 justify-content-center align-items-center loading">
        {allowedScopes.includes(type) ? (
          <>
            {type === "icon" && <Icon />}
            {type === "logo" && <Logo />}
            {type === "animated" && <Animated />}
            {type === "spinner" && <Spinner />}
            {type === "text" && <Text />}
          </>
        ) : (
          <Icon />
        )}
      </div>
    </div>
  );
}
