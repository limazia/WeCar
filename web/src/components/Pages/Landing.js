import { Fragment } from "react";

import { Head } from "../Head";
import { SelectWrapper } from "../Select";

export function Landing() {
  return (
    <Fragment>
      <Head />
      <div className="container-fluid box-search">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-7">
            <div className="search">
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
                  <form>
                    <div className="form-group mb-0 wicon">
                      <i className="fas fa-search left"></i>
                       <SelectWrapper />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
