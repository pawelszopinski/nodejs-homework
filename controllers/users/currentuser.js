import { getUser } from "./getUser.js";

export const current = (req, res) => {
  const { email, subscription } = req.user;

  try {
    const id = req.user.id;
    const user = getUser(id);

    if (!user) {
      return res.json({
        status: "error",
        code: 401,
        data: {
          message: `Unauthorized`,
        },
      });
    }
    }  catch (error) {
    console.error(error);
  }
};