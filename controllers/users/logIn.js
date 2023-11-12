import jwt from "jsonwebtoken";
import { User } from "../../models/users.js";

const secret = encodeURIComponent(process.env.SECRET);

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Sprawdź, czy użytkownik istnieje
    const user = await User.findOne({ email });
    if (!user) {
      console.error('User not found for email:', email);
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "User not found",
        data: "Not Found",
      });
    }

    // Weryfikuj hasło
    if (!user.validPassword(password)) {
      console.error('Invalid password for email:', email);
      return res.status(401).json({
        status: "error",
        code: 401,
        message: "Email or password is wrong",
        data: "Bad request",
      });
    }

    // Generuj token JWT
    const payload = {
      id: user.id,
      email: user.email,
      subscription: user.subscription,
    };

    const token = jwt.sign(payload, secret, { expiresIn: "1h" });

    console.log('Login successful for email:', email);
    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        token,
        user: {
          email: `${payload.email}`,
          subscription: `${payload.subscription}`,
        },
      },
    });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(400).json({
      status: "Bad request",
      code: 400,
      message: "Login failed",
    });
  }
};
