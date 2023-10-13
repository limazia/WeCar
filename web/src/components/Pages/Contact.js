import { useState } from "react";
import { toast } from "react-toastify";

import api from "~/utils/services/api";
import { maskPhone } from "~/utils/services/mask";

import { Head } from "~/components/Partials/Head";
import { Spinner } from "~/components/Partials/Spinner";

export function Contact() {
  const INITIAL_STATE = {
    name: "",
    email: "",
    phone: "",
    subject: "",
    messagecontent: "",
  };

  const [personal, setPersonal] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);

  const onInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "phone") {
      setPersonal((prevState) => ({
        ...prevState,
        phone: maskPhone(value),
      }));
    } else {
      setPersonal((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone, subject, messagecontent } = personal;

    if (name && email && phone && subject && messagecontent) {
      setLoading(true);

      try {
        const { data } = await api.post("/api/contact", { personal });
        const { error, message } = data;

        if (message) {
          toast.success(message);
          setPersonal(INITIAL_STATE);
          setLoading(false);
        } else {
          toast.error(error);
          setLoading(false);
        }
      } catch (ex) {
        console.log(ex);
        toast.error("Houve um problema com o servidor!");
        setLoading(false);
      }
    } else {
      toast.error("Preencha todos os campos para continuar!");
    }
  };

  return (
    <>
      <Head title="Contato" />
      <div className="container-fluid bg-light">
        <div className="row justify-content-center">
          <div className="col-md-9">
            <div className="row">
              <div className="col-md-8 mt-5 pb-5">
                <h1>Fale conosco</h1>
                <span className="text-muted">
                  Tire suas dúvidas sobre qualquer assunto enviando um
                  formulário.
                </span>
                <form onSubmit={handleSubmit} className="mt-4">
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-12">
                          <label htmlFor="name">Nome Completo</label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-control"
                            value={personal?.name}
                            onChange={onInputChange}
                          />
                        </div>
                      </div>
                      <div className="row mt-4">
                        <div className="col-md-12">
                          <label htmlFor="email">Email</label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            value={personal?.email}
                            onChange={onInputChange}
                          />
                        </div>
                      </div>
                      <div className="row mt-4">
                        <div className="col-md-12">
                          <label htmlFor="phone">Telefone</label>
                          <input
                            type="text"
                            id="phone"
                            name="phone"
                            className="form-control"
                            value={personal?.phone}
                            onChange={onInputChange}
                          />
                        </div>
                      </div>
                      <div className="row mt-4">
                        <div className="col-md-12">
                          <label htmlFor="subject">Assunto</label>
                          <input
                            type="text"
                            id="subject"
                            name="subject"
                            className="form-control"
                            value={personal?.subject}
                            onChange={onInputChange}
                          />
                        </div>
                      </div>
                      <div className="row mt-4">
                        <div className="col-md-12">
                          <label htmlFor="messagecontent">Mensagem</label>
                          <textarea
                            className="form-control"
                            id="messagecontent"
                            name="messagecontent"
                            rows="4"
                            value={personal?.messagecontent}
                            onChange={onInputChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-md-12">
                      <button
                        className="btn btn-warning btn-lg text-white"
                        disabled={
                          !personal?.name ||
                          !personal?.email ||
                          !personal?.phone ||
                          !personal?.subject ||
                          !personal?.messagecontent
                            ? true
                            : false
                        }
                      >
                        {loading ? <Spinner type="grow" /> : "Enviar"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="col-md-4 pb-5" style={{ marginTop: "70px" }}>
                <div className="contact">
                  <div className="contact-info">
                    <i className="fas fa-map-marker-alt"></i>
                    <span>Alguma rua, 000 - São Paulo, SP</span>
                  </div>
                  <div className="contact-info">
                    <i className="fa fa-phone"></i>
                    <span>(DDD) xxxx-xxxx</span>
                  </div>
                  <div className="contact-info">
                    <i className="fab fa-whatsapp"></i>
                    <span>(DDD) xxxx-xxxx</span>
                  </div>
                  <div className="contact-info">
                    <i className="fa fa-envelope"></i>
                    <span>contato@wecar.com.br</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
