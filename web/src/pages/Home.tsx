import { Head } from "@components/Head";
import { Services } from "@components/Services";
import { Search } from "@components/Search";

export function Home() {
  return (
    <>
      <Head />
      <div className="container-fluid home bg-light pb-5">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8">
            <div className="content">
              <h1 className="title">Seu site de venda de carros favorito</h1>
              <span className="description">
                Encontre o melhor carro para você
              </span>

              <div className="card p-2 mt-5">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12">
                      <Search />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Services />
    </>
  );
}
