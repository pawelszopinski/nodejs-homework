import { addContact } from "../../service/index.js";

export const create = async (req, res, next) => {
  const { name, email, phone } = req.body;
  try {
    const result = await addContact({ name, email, phone });

    res.status(201).json({
      status: "success",
      code: 201,
      data: { contacts: result },
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};