const cryptoRandomString = require("crypto-random-string");

const constant = require("../constants");

const ContactEmail = require("../jobs/ContactEmail");
const SellEmail = require("../jobs/SellEmail");

class EmailController {
  async sendContactEmail(request, response) {
    const { name, email, phone, subject, message } = request.body;

    const identifier = cryptoRandomString({ length: 10, type: "numeric" });

    const options = {
      from: "WeCar <contato@wecar.com.br>",
      to: "limadeacacio@gmail.com",
      subject: `Contato #${identifier}`,
      template: "contact",
    };

    const context = {
      identifier,
      name,
      email,
      phone,
      subjectContent: subject,
      message,
    };

    await ContactEmail.handle({ options, context });

    return response.json({
      message: constant.success.email.MESSAGE_SENT_SUCCESSFULLY,
    });
  }

  async sendSellEmail(request, response) {
    //const { name, email } = request.body;

    const identifier = cryptoRandomString({ length: 10, type: "numeric" });

    const name = "Carlos Acácio de Lima Filho";
    const email = "limadeacacio@gmail.com";

    const options = {
      from: "WeCar <contato@wecar.com.br>",
      subject: `Venda ${identifier}`,
      template: "mercedesbenz",
    };

    const context = {
      name,
      email,
    };

    await SellEmail.handle({ options, context });

    return response.json({ message: "Instruções enviada com sucesso." });
  }
}

module.exports = new EmailController();
