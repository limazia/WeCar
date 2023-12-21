import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "@phosphor-icons/react";
import { toast } from "react-toastify";

import { ConfigService } from "@shared/services/ConfigService";
import { Config } from "@shared/interfaces";

import { Head } from "@components/Head";
import { ActionButtons } from "@components/ActionButtons";
import { RedirectPermission } from "@components/Permission";
import { Input } from "@components/Forms/Input";
import { Button } from "@components/Forms/Button";
import { Spinner } from "@components/Spinner";

export function UpdateSystemSettings() {
  const navigate = useNavigate();

  const [config, setConfig] = useState<Config>({
    whatsApp: "",
    facebook: "",
    instagram: "",
    address: "",
    telephone: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadConfig();
  }, []);

  async function loadConfig() {
    const response = await ConfigService.list();

    if (response === undefined) {
      navigate("/admin/settings/web");
    } else {
      setLoading(false);
      setConfig({
        ...config,
        whatsApp: response.whatsApp,
        facebook: response.facebook,
        instagram: response.instagram,
        address: response.address,
        telephone: response.telephone,
        email: response.email,
      });
    }
  }

  const onInputChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ): void => {
    const { name, value } = event.target;

    setConfig((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);

    const { whatsApp, facebook, instagram, address, telephone, email } = config;

    const payload = {
      whatsApp,
      facebook,
      instagram,
      address,
      telephone,
      email,
    };

    try {
      const { error, message } = await ConfigService.update(payload);

      if (message) {
        toast.success(message);
        setConfig({
          whatsApp: "",
          facebook: "",
          instagram: "",
          address: "",
          telephone: "",
          email: "",
        });
        setLoading(false);

        const event = new CustomEvent("refresh-config");
        window.dispatchEvent(event);

        navigate("/admin/settings/web");
      }

      if (error) {
        toast.error(error);
        setLoading(false);
      }
    } catch (ex) {
      setLoading(false);
    }
  }

  const isValid = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const { whatsApp, facebook, instagram, address, telephone, email } = config;

    return (
      loading ||
      !whatsApp ||
      !facebook ||
      !instagram ||
      !address ||
      !telephone ||
      !email ||
      !emailRegex.test(email)
    );
  };

  return (
    <>
      <Head title="Editando configurações" />
      <RedirectPermission required={["settings.update"]} />
      <div className="container pb-5">
        <div className="row">
          <div className="col-md-12">
            <div className="d-flex align-items-center justify-content-end">
              <ActionButtons onRefreshClick={() => null} />
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <Link to="/admin/settings/web">
                    <ArrowLeft size={20} className="mr-2" color="#000" />
                  </Link>
                  <h5 className="card-title mb-0">Editando configurações</h5>
                </div>

                <form onSubmit={handleSubmit} className="mt-4">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="d-flex flex-column">
                        <span className="text-muted font-weight-bold">
                          WhatsApp
                        </span>

                        <div className="form-group">
                          <Input
                            type="text"
                            name="whatsApp"
                            disabled={loading}
                            value={config?.whatsApp}
                            onChange={onInputChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="d-flex flex-column">
                        <span className="text-muted font-weight-bold">
                          Facebook
                        </span>
                        <div className="input-group mb-3">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              facebook.com/
                            </span>
                          </div>
                          <Input
                            type="text"
                            name="facebook"
                            disabled={loading}
                            value={config?.facebook}
                            onChange={onInputChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="d-flex flex-column">
                        <span className="text-muted font-weight-bold">
                          Instagram
                        </span>
                        <div className="input-group mb-3">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              instagram.com/
                            </span>
                          </div>
                          <Input
                            type="text"
                            name="instagram"
                            disabled={loading}
                            value={config?.instagram}
                            onChange={onInputChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row mt-4">
                    <div className="col-md-4">
                      <div className="d-flex flex-column">
                        <span className="text-muted font-weight-bold">
                          Endereço
                        </span>
                        <Input
                          type="text"
                          name="address"
                          disabled={loading}
                          value={config?.address}
                          onChange={onInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="d-flex flex-column">
                        <span className="text-muted font-weight-bold">
                          Telefone
                        </span>
                        <Input
                          type="text"
                          name="telephone"
                          disabled={loading}
                          value={config?.telephone}
                          onChange={onInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="d-flex flex-column">
                        <span className="text-muted font-weight-bold">
                          E-mail
                        </span>
                        <Input
                          type="text"
                          name="email"
                          disabled={loading}
                          value={config?.email}
                          onChange={onInputChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-md-12">
                      <Button
                        type="submit"
                        className="btn btn-primary-w btn-block"
                        disabled={isValid()}
                      >
                        {loading ? (
                          <>
                            <Spinner /> Atualizando...
                          </>
                        ) : (
                          "Atualizar"
                        )}
                      </Button>
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
