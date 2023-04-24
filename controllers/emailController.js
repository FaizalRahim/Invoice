const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = async (req, res) => {
  const { message, invoiceNumber, companyEmail } = req.body;
  const invoiceFile = req.file; 

  try {
    const transporter = nodemailer.createTransport({
      service: "Hotmail",
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: `${companyEmail}`,
      subject: `Invoice ${invoiceNumber}`,
      text: message,
      attachments: [
        {
          filename: invoiceFile.originalname,
          content: invoiceFile.buffer,
        },
      ],
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error sending email');
  }
};

module.exports = {
  sendEmail,
};
