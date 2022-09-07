import { Fragment, useState } from "react";
import { Form } from "@rocketseat/unform";
import { toast } from "react-toastify";

import api from "~/services/api";
import { maskPhone } from "~/utils/mask";

import { Head } from "~/components/Partials/Head";
import { Spinner } from "~/components/Forms/Spinner";

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (name && email && phone && subject && messageContent) {
      setLoading(true);

      try {
        const { data } = await api.post("/api/contact", {
          name,
          email,
          phone,
          subject,
          message: messageContent,
        });
        const { error, message } = data;

        if (message) {
          toast.success(message);
          setName("");
          setEmail("");
          setPhone("");
          setSubject("");
          setMessageContent("");
          setLoading(false);
        } else {
          toast.error(error);
          setLoading(false);
        }
      } catch (ex) {
        console.log(ex)
        toast.error("Houve um problema com o servidor!");
        setLoading(false);
      }
    } else {
      toast.error("Preencha todos os campos para continuar!");
    }
  }

  return (
    <Fragment>
      <Head title="Contato" />
      <div className="container-fluid bg-light">
        <div className="row justify-content-center">
          <div className="col-md-9">
            <div className="row">
              <div className="col-md-8 mt-5 pb-5">
                <h1>Fale conosco</h1>
                <Form onSubmit={handleSubmit}>
                  <div className="row mt-4">
                    <div className="col-md-12">
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-md-12">
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-md-12">
                      <input
                        type="text"
                        name="phone"
                        className="form-control"
                        placeholder="Telefone"
                        value={phone}
                        onChange={(e) => setPhone(maskPhone(e.target.value))}
                      />
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-md-12">
                      <input
                        type="text"
                        name="subject"
                        className="form-control"
                        placeholder="Assunto"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-md-12">
                      <textarea
                        className="form-control"
                        name="message"
                        rows="4"
                        placeholder="Mensagem"
                        value={messageContent}
                        onChange={(e) => setMessageContent(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-md-12">
                      <button
                        className="btn btn-warning btn-lg text-white"
                        disabled={
                          !name || !email || !phone || !subject || !messageContent
                            ? true
                            : false
                        }
                      >
                        {loading ? <Spinner type="grow" /> : "Enviar"}
                      </button>
                    </div>
                  </div>
                </Form>
              </div>
              <div className="col-md-4 mt-5 pb-5">
                <div className="contact">
                  <div className="contact-info">
                    <i className="fas fa-map-marker-alt"></i>
                    <span>Rua dos Pinheiros, 248 - São Paulo, SP</span>
                  </div>
                  <div className="contact-info">
                    <i className="fa fa-phone"></i>
                    <span>(11) xxxx-xxxx</span>
                  </div>
                  <div className="contact-info">
                    <i className="fab fa-whatsapp"></i>
                    <span>(19) xxxx-xxxx</span>
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
    </Fragment>
  );
}
