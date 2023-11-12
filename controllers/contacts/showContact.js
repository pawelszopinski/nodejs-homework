import { getContactById } from "../../service/index.js";

export const getById = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const result = await getContactById(contactId);
    if (result) {
      return res.json({
        status: "success",
        code: 200,
        data: { contact: result },
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
