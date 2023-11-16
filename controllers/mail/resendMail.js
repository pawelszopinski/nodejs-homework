import Joi from "joi";
import "dotenv/config";
import { v4 as uuidv4 } from "uuid";
import { User } from "../../models/users.js";
import sendMail from "./mailSending.js";

export const resendVerificationEmail = async (req, res, next) => {
  // Validate the request body using Joi
  const schema = Joi.object({
    email: Joi.string().email().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: "missing required field email",
    });
  }

  const { email } = req.body;

  try {
    // Check if the user with the given email exists
    const user = await User.findOne({ email });

    // If user not found, return an error
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // If user is already verified, return an error
    if (user.verify) {
      return res.status(400).json({
        message: "Verification has already been passed",
      });
    }

    // Generate a new verification token
    const verificationToken = uuidv4();

    // Update user's verificationToken in the database
    user.verificationToken = verificationToken;
    await user.save();
    const senderMail = process.env.SENDER_MAIL;
    // Send the verification email again
    await sendMail({
      to: email,
      from: senderMail,
      subject: "Email Verification",
      text: `Click the following link to verify your email: http://localhost:3000/users/verify/${verificationToken}`,
      html: `<p>Click the following link to verify your email:</p><p><a href="http://localhost:3000/users/verify/${verificationToken}">Verify Email</a></p>`,
    });

    // Return success response
    res.status(200).json({
      message: "Verification email sent",
    });
  } catch (error) {
    next(error);
  }
};
