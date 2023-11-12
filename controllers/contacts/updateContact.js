import { updateContact } from "../../service/index.js";

export const update = async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone, favorite } = req.body;
  try {
    const result = await updateContact(contactId, {
      name,
      email,
      phone,
      favorite,
    });

    if (result) {
      return res.json({
        status: "success",
        code: 200,
        data: { contacts: result },
      });
    }

    res.status(404).json({
      status: "error",
      code: 404,
      message: `Not found contacts id: ${contactId}`,
      data: "Not Found",
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
