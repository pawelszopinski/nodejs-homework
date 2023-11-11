import { listContacts } from "../../service/index.js";

export const get = async (req, res, next) => {
  try {
    const results = await listContacts();
    res.json({
      status: "success",
      code: 200,
      data: {
        contacts: results,
      },
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};