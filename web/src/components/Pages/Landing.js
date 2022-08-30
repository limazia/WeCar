import { Fragment, useState } from "react";

import { Head } from "~/components/Head";
import { Jumbotron } from "~/components/Jumbotron";
import { Services } from "~/components/Services";
import { CardCar } from "~/components/Card";

export function Landing() {
  const [marca, setMarca] = useState("");

  const handleChange = (event) => {
    console.log({
      input: [event.target.name],
      message: event.target.value,
    });

    setMarca(event.target.value);
  };

  return (
    <Fragment>
      <Head title="Inicio" />
      <Jumbotron />
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-12 col-sm-12 col-md-12 col-lg-9 col-xl-9">
            <div className="card p-4" style={{ marginTop: "-200px" }}>
              <div className="card-body">
                <form>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Marca</label>
                        <input
                          type="email"
                          className="form-control"
                          name="marca"
                          value={marca}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Modelo</label>
                        <input type="email" className="form-control" />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Ano (de)</label>
                        <input type="email" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Ano (até)</label>
                        <input type="email" className="form-control" />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Preço (de)</label>
                        <input type="email" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Preço (até)</label>
                        <input type="email" className="form-control" />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 d-flex justify-content-end">
                      <button className="btn btn-search">Buscar</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid mt-5">
        <div className="row bg-light">
          <div className="container pb-5 mt-5">
            <div className="row">
            <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                <CardCar />
              </div>
              <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                <CardCar />
              </div>
              <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
                <CardCar />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Services />
    </Fragment>
  );
}
