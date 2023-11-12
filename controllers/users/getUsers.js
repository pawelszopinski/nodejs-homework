import { User } from "../../models/users.js";

export const getUsers = async (_, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        users,
      },
    });
  } catch (error) {
    next(error);
  }
};