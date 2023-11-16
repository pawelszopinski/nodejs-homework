import sgMail from '@sendgrid/mail';
import "dotenv/config";
sgMail.setApiKey(process.env.MAIL_API_KEY);

const msg = {
  to: 'kisielof@gmail,com',
  from: 'parnegaccio@gmail.com',
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};

sgMail.send(msg)
  .then(() => {
    console.log('Email sent');
  })
  .catch(error => {
    console.error(error);
  });