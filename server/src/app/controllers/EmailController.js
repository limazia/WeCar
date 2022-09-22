const cryptoRandomString = require("crypto-random-string");

const constant = require("../constants");

const ContactEmail = require("../jobs/ContactEmail");
const SellEmail = require("../jobs/SellEmail");

class EmailController {
  async ContactEmail(request, response) {
    const { personal } = request.body;
    const { name, email, phone, subject, messagecontent } = personal;

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
      message: messagecontent,
    };

    await ContactEmail.handle({ options, context });

    return response.json({
      message: constant.success.email.MESSAGE_SENT_SUCCESSFULLY,
    });
  }

  async SellEmail(request, response) {
    const { personal } = request.body;
    const { name, email, phone } = personal;

    const identifier = cryptoRandomString({ length: 10, type: "numeric" });

    const options = {
      from: "WeCar <vendas@wecar.com.br>",
      to: "limadeacacio@gmail.com",
      subject: `Proposta de Venda #${identifier}`,
      template: "sell",
    };

    const context = {
      identifier,
      name,
      email,
      phone,
    };

    await ContactEmail.handle({ options, context });

    return response.json({
      message: constant.success.email.MESSAGE_SENT_SUCCESSFULLY,
    });
  }
}

module.exports = new EmailController();
