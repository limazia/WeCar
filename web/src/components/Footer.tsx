import { Link } from "react-router-dom";
import { FacebookLogo, InstagramLogo } from "@phosphor-icons/react";

import { useConfig } from "@shared/hooks/useConfig";

import { ReactComponent as Logo } from "@assets/logo.svg";

export function Footer() {
  const { config } = useConfig();

  const facebook = `https://www.facebook.com/${config?.facebook}`;
  const instagram = `https://www.instagram.com/${config?.instagram}`;

  const company = import.meta.env.VITE_APP_NAME;
  const year = new Date().getFullYear();

  return (
    <footer className="footer-main">
      <div className="container-fluid py-5 footer-utility">
        <div className="row py-4">
          <div className="col-lg-4 col-md-6 mb-lg-0">
            <div className="logo">
              <Logo className="img-fluid" />
              <p className="text-muted">
                Plataforma que facilita a <br /> busca pelo novo automóvel
              </p>
            </div>
          </div>
          <div className="col-lg-2 col-md-6 mb-3 mb-lg-0">
            <h6 className="font-weight-bold mb-3">Menu Principal</h6>
            <ul className="list-unstyled mb-0">
              <li className="mb-2">
                <Link to="/company">Empresa</Link>
              </li>
              <li className="mb-2">
                <a href="#">Termos de uso</a>
              </li>
            </ul>
          </div>
          <div className="col-lg-2 col-md-6 mb-3 mb-lg-0">
            <h6 className="font-weight-bold mb-3">Serviços</h6>
            <ul className="list-unstyled mb-0">
              <li className="mb-2">
                <Link to="/buy">Comprar</Link>
              </li>
              <li className="mb-2">
                <Link to="/sell">Venda seu carro</Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-2 col-md-6 mb-3 mb-lg-0">
            <h6 className="font-weight-bold mb-3">Administração</h6>
            <ul className="list-unstyled mb-0">
              <li className="mb-2">
                <Link to="/admin/">Fazer login</Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-2 col-md-6 mb-3 mb-lg-0">
            <h6 className="font-weight-bold mb-3">Siga-nos</h6>
            <ul className="list-unstyled mb-0">
              <li className="list-inline-item">
                <a
                  href={facebook}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FacebookLogo size={20} className="mr-1" />
                </a>
              </li>
              <li className="list-inline-item">
                <a
                  href={instagram}
                  target="_blank"
                  rel="noreferrer"
                >
                  <InstagramLogo size={20} />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-divider" />
      <div className="bg-white py-4">
        <div className="container-fluid">
          <p className="copyright mb-0 py-2">
            © {year} {company}.
          </p>
        </div>
      </div>
    </footer>
  );
}
