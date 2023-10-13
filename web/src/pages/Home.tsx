import { Head } from "@components/Head";
import { Services } from "@components/Services";
import { Search } from "@components/Search";

export function Home() {
  return (
    <>
      <Head />
      <div className="container-fluid box-search bg-light">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 search">
            <div className="text-center">
              <h1 className="title">
                Seu site de venda de carros
                <br />
                favorito
              </h1>
              <span className="description">
                Encontre o melhor carro para você
              </span>
            </div>
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
      <Services />
    </>
  );
}
