import { Link } from "react-router-dom";
import { House } from "@phosphor-icons/react";

import { WhatsAppIcon } from "./Icons";

export function WhatsApp() {
  const number = import.meta.env.VITE_PHONE_NUMBER;
  const message = "Olá, gostaria de falar com um vendedor da WeCar!";

  const whatsapp_url = `https://api.whatsapp.com/send?phone=${number}&text=${message}`;

  return (
    <a
      href={whatsapp_url}
      target="_blank"
      rel="noreferrer"
      className="btn btn-whatsapp d-none d-md-flex"
    >
      <WhatsAppIcon />
    </a>
  );
}

export function ReturnToApp() {
  return (
    <Link to="/" className="btn btn-home d-none d-md-flex">
      <House size={32} color="#fff" />
    </Link>
  );
}
