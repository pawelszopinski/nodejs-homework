import { updateStatusContact } from "../../service/index.js";

export const updateStatus = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  if (favorite === undefined || favorite === null) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "Missing field favorite",
    });
  }

  try {
    const result = await updateStatusContact(contactId, { favorite });
    if (result) {
      res.json({
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
