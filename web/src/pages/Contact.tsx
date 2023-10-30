import { useState, FormEvent, ChangeEvent } from "react";
import { toast } from "react-toastify";
import { MapPin, Phone, Envelope } from "@phosphor-icons/react";

import { EmailService } from "@shared/services/EmailService";
import { maskPhone } from "@shared/helpers/mask";
import { Contact as IContact } from "@shared/interfaces";

import { useConfig } from "@shared/hooks/useConfig";

import { Head } from "@components/Head";
import { SectionTitle } from "@components/SectionTitle";
import { Button } from "@components/Forms/Button";
import { Input } from "@components/Forms/Input";
import { Textarea } from "@components/Forms/Textarea";

export function Contact() {
  const { config } = useConfig();

  const [formValues, setFormValues] = useState<IContact>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    let maskedValue = value;

    if (name === "phone") {
      maskedValue = maskPhone(value);
    }

    setFormValues({
      ...formValues,
      [name]: maskedValue,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, phone, subject, message } = formValues;

    if (!name || !email || !phone || !subject || !message) {
      toast.error("Preencha todos os campos!");
      return;
    }

    setLoading(true);

    setTimeout(async () => {
      await EmailService.send({ name, email, phone, subject, message });

      resetFields();
    }, 2000);
  };

  const resetFields = () => {
    setFormValues({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
    setLoading(false);
  };

  const isValid = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const { name, email, phone, subject, message } = formValues;

    return (
      loading ||
      !name ||
      !email ||
      !emailRegex.test(email) ||
      !phone ||
      !subject ||
      !message
    );
  };

  const address = config?.address;
  const telephone = config?.telephone;
  const email = config?.email;

  return (
    <>
      <Head title="Contato" />
      <div className="container-fluid bg-light">
        <div className="row justify-content-center">
          <div className="col-md-9 mt-5 pb-5">
            <div className="row">
              <div className="col-md-12">
                <SectionTitle
                  title="Fale conosco"
                  subtitle=" Tire suas dúvidas sobre qualquer assunto enviando um formulário."
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-8">
                <form onSubmit={handleSubmit}>
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-12">
                          <label htmlFor="name">Nome Completo</label>
                          <Input
                            type="text"
                            id="name"
                            name="name"
                            disabled={loading}
                            value={formValues.name}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="row mt-4">
                        <div className="col-md-6">
                          <label htmlFor="email">Email</label>
                          <Input
                            type="email"
                            id="email"
                            name="email"
                            disabled={loading}
                            value={formValues.email}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="phone">Telefone</label>
                          <Input
                            type="text"
                            id="phone"
                            name="phone"
                            disabled={loading}
                            value={formValues.phone}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="row mt-4">
                        <div className="col-md-12">
                          <label htmlFor="subject">Assunto</label>
                          <Input
                            type="text"
                            id="subject"
                            name="subject"
                            disabled={loading}
                            value={formValues.subject}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="row mt-4">
                        <div className="col-md-12">
                          <label htmlFor="messagecontent">Mensagem</label>
                          <Textarea
                            id="messagecontent"
                            name="message"
                            disabled={loading}
                            rows={4}
                            value={formValues.message}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-md-12">
                      <Button
                        type="submit"
                        className="btn btn-primary-w btn-block"
                        disabled={isValid()}
                        loading={loading}
                      >
                        Enviar contato
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="col-md-4 d-none d-md-flex">
                <div className="contact">
                  <div className="contact-info">
                    <MapPin size={20} />
                    <span>{address}</span>
                  </div>
                  <div className="contact-info">
                    <Phone size={20} />
                    <span>{telephone}</span>
                  </div>
                  <div className="contact-info">
                    <Envelope size={20} />
                    <span>{email}</span>
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
