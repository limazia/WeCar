export function WhatsApp() {
  const number = "551999999999";
  const message = "Olá, gostaria de falar com um vendedor da WeCar!";

  const endpoint = `https://api.whatsapp.com/send?phone=${number}&text=${message}`;

  return (
    <a href={endpoint} target="_blank" className="btn btn-whatsapp">
      <i className="fab fa-whatsapp"></i>
    </a>
  );
}
