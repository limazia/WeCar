export function WhatsApp() {
  const number = "551999999999";
  const message = "Olá, gostaria de falar com um vendedor da WeCar!";

  const endpoint = `https://api.whatsapp.com/send?phone=${number}&text=${message}`;

  return (
    <a
      href={endpoint}
      target="_blank"
      rel="noreferrer"
      className="btn btn-whatsapp d-none d-md-flex"
    >
      <i className="fab fa-whatsapp"></i>
    </a>
  );
}
