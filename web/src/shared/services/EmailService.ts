import { toast } from "react-toastify";
import { send } from "@emailjs/browser";

import { Send as SendProps } from "@shared/interfaces";

const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const SERVICE_KEY = import.meta.env.VITE_EMAILJS_SERVICE_KEY;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

export const EmailService = {
  send: async function ({ name, email, phone, subject, message }: SendProps): Promise<void> {
    try {
      const templateParams = {
        name,
        email,
        phone,
        subject,
        message,
      };

      await send(SERVICE_KEY, TEMPLATE_ID, templateParams, PUBLIC_KEY);

      toast.success("Contato enviado com sucesso!");
    } catch (ex) {
      toast.error("Erro ao enviar o contato!");
    }
  },
};
