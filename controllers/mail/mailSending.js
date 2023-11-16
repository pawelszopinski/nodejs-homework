import sgMail from "@sendgrid/mail";
import "dotenv/config";
sgMail.setApiKey(process.env.MAIL_API_KEY);

const sendMail = async ({ to, from, subject, text, html }) => {
  const msg = {
    to,
    from,
    subject,
    text,
    html,
  };

  try {
    await sgMail.send(msg);
    console.log("Email sent");
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export default sendMail;
