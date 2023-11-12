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
    const newUser = new User({ email, subscription });
    newUser.setPassword(password);
    await newUser.save();
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        user: {
          subscription: newUser.subscription || "starter",
          message: "Registration successful",
        },
      },
    });
  } catch (error) {
    next(error);
  }
};