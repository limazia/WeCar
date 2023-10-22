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
