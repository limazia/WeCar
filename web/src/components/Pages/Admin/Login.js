import { Fragment } from "react";

import { Spinner } from "~/components/Spinner";
import { Head } from "~/components/Head";

import { ReactComponent as Logo } from "~/assets/logo.svg";
import LoginBackground from "~/assets/bg-login.jpg";

export function Login() {
  return (
    <Fragment>
      <Head title="Iniciar sessão" />
      <div className="container-fluid login-form">
        <div className="row no-gutter">
          <div
            className="col-md-6 d-none d-md-flex bg-image"
            style={{ backgroundImage: `url(${LoginBackground})` }}
          ></div>
          <div className="col-md-6 bg-light">
            <div className="login d-flex align-items-center py-5">
              <div className="container">
                <div className="row">
                  <div className="col-lg-10 col-xl-7 mx-auto">
                    <div className="display-4 box-logo">
                      <Logo className="img-fluid mr-2" />
                    </div>
                    <p className="text-muted mt-3 mb-4 text-center">
                      Inicie uma sessão para continuar
                    </p>
                    <form>
                      <div className="form-group mb-3 wicon">
                        <i className="fas fa-envelope left"></i>
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          placeholder="Email"
                        />
                      </div>
                      <div className="form-group mb-3 wicon">
                        <i className="fas fa-lock left"></i>
                        <input
                          type="password"
                          name="password"
                          className="form-control"
                          placeholder="Senha"
                        />
                      </div>
                      <button type="submit" className="btn btn-login btn-block">
                        <Spinner type="grow" />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
