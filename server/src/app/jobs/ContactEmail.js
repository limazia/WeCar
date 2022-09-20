const constant = require("../constants");

const Mail = require("../../lib/Mail");

class ContactEmail {
  async handle({ options, context }) {
    const { from, to, subject, template } = options;

    const mailOptions = {
      from,
      to,
      subject,
      template,
      context,
    };

    try {
      Mail.sendMail(mailOptions, (error, info) => {
        console.log(`[Contact] > Email enviado para ${info.response}.`);

        if (error) {
          console.log(error);
        }
      });
    } catch (e) {
      console.log(`[Contact] > ${constant.error.form.ERROR_SENDING_EMAIL}`);
    }
  }
}

module.exports = new ContactEmail();