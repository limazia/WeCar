const cryptoRandomString = require("crypto-random-string");

const constant = require("../constants");

const Email = require("../jobs/Email");

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

    await Email.handle({ options, context });

    return response.json({
      message: constant.success.email.MESSAGE_SENT_SUCCESSFULLY,
    });
  }

  async SellEmail(request, response) {
    const { personal, car } = request.body;
    const { name, email, phone, address, city, state } = personal;
    const {
      brand_name,
      model_name,
      car_version,
      car_color,
      car_km,
      car_year,
      car_fuel,
      car_exchange,
      car_observations,
      firstOwner,
      spot,
      vehicleInsurance,
      recoveredTheft,
    } = car;

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
      address,
      city,
      state,
      brand_name,
      model_name,
      car_version,
      car_color,
      car_km: car_km.toLocaleString("pt-BR", { maximumFractionDigits: 2 }),
      car_year,
      car_fuel,
      car_exchange,
      car_observations: car_observations ? car_observations : "Nenhuma observação",
      firstOwner,
      spot,
      vehicleInsurance,
      recoveredTheft,
    };

    await Email.handle({ options, context });

    return response.json({
      message: constant.success.email.MESSAGE_SENT_SUCCESSFULLY,
    });
  }
}

module.exports = new EmailController();
