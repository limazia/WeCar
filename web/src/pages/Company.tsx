import { Head } from "@components/Head";
import { SectionTitle } from "@components/SectionTitle";

import CompanyBackground from "@assets/bg-company.jpg";

export function Company() {
  return (
    <>
      <Head title="Empresa" />
      <div className="container-fluid bg-light">
        <div className="row justify-content-center">
          <div className="col-md-7 mt-5 pb-5">
            <SectionTitle
              title="Conheça nossa história"
              subtitle="Explore nossa jornada de sucesso e descubra nossa história inspiradora."
            />
            <div className="company-image mt-3">
              <img src={CompanyBackground} loading="lazy" alt="" />
            </div>
            <div className="company-description mt-4">
              <p>
                Somos uma empresa tradicional no ramo de veículos, trabalhamos
                sempre focados na satisfação dos nossos clientes.
              </p>
              <p>
                Mantendo sempre um estoque atualizado e com veículos de
                qualidade, buscamos oferecer uma grande variedade de carros para
                escolha de nossos clientes.
              </p>

              <b>
                Venha a nossa loja e confira nosso amplo estoque de veículos
                novos e seminovos!
              </b>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
