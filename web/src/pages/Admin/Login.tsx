import { useState, FormEvent, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "@shared/hooks/useAuth";

import { Head } from "@components/Head";
import { Button } from "@components/Forms/Button";
import { Input } from "@components/Forms/Input";

import { ReactComponent as Logo } from "@assets/logo.svg";

export function Login() {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin");
    }
  }, [isAuthenticated]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);

    try {
      await login({
        email,
        password,
      });

      setLoading(false);
    } catch (ex) {
      setLoading(false);
    }
  }

  const validate = loading || !email || !password;

  return (
    <>
      <Head title="Iniciar sessão" />
      <div className="container vh-100">
        <div className="row vh-100 d-flex justify-content-center align-items-center">
          <div className="col-md-5">
            <div className="card">
              <div className="card-body d-flex flex-column justify-content-between p-5">
                <Link to="/">
                  <Logo width={150} />
                </Link>
                <small className="text-muted">
                  Faça o login para continuar navegando.
                </small>

                <form onSubmit={handleSubmit} className="mt-4">
                  <div className="row">
                    <div className="col-md-12">
                      <Input
                        type="text"
                        placeholder="E-mail"
                        disabled={loading}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-md-12">
                      <Input
                        type="password"
                        placeholder="*********"
                        disabled={loading}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-md-12">
                      <Button
                        type="submit"
                        className="btn btn-login btn-block"
                        disabled={validate}
                        loading={loading}
                      >
                        Entrar
                      </Button>
                    </div>

                    <div className="col-md-12 mt-1">
                      <small className="text-muted">
                        <Link to="/admin/forgot">Esqueceu a senha?</Link>
                      </small>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
