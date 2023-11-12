import { removeContact } from "../../service/index.js";

export const remove = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const result = await removeContact(contactId);
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: { contacts: result },
      });
    } 
      res.json({
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