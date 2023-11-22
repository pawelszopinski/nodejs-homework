import gravatar from "gravatar";
import { v4 as uuidv4 } from "uuid";
import "dotenv/config";
import sendMail from "../mail/mailSending.js";
import { User } from "../../models/users.js";

export const signup = async (req, res, next) => {
  const { email, password, subscription } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    return res.status(409).json({
      status: "error",
      code: 409,
      message: "Email is already in use",
      data: "Conflict",
    });
  }

  try {
    const verificationToken = uuidv4();
    const avatarURL = gravatar.url(email, { s: "100", d: "retro" });
    const newUser = new User({
      email,
      subscription,
      avatarURL,
      verificationToken,
    });
    newUser.setPassword(password);
    await newUser.save();
    const senderMail = process.env.SENDER_MAIL;

    // Send email with verification link
    await sendMail({
      to: email,
      from: senderMail,
      subject: "Email Verification",
      text: `Click the following link to verify your email: http://localhost:3000/users/verify/${verificationToken}`,
      html: `<p>Click the following link to verify your email:</p><p><a href="http://localhost:3000/users/verify/${verificationToken}">Verify Email</a></p>`,
    });

    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        user: {
          subscription: newUser.subscription || "starter",
          message: "Registration successful",
          avatarURL: newUser.avatarURL,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};
