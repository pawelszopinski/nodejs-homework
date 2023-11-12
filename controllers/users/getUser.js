import { User } from "../../models/users.js";

export const getUser = async (id) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      return null;
    } else {
      return user;
    }
  } catch (error) {
    console.log(error);
  }
};