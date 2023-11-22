import { User } from "../../models/users.js";

export const verifyUser = async (req, res) => {
  const { verificationToken } = req.params;

  try {
    const user = await User.findOne({ verificationToken });

    if (!user) {
      return res.status(404).json({
        status: "Not found",
        code: 404,
        message: "User not found",
      });
    }

    user.verificationToken = null;
    user.verify = true;
    await user.save();

    return res.status(200).json({
      status: "success",
      code: 200,
      message: "Verification successful",
    });
  } catch (error) {
    console.error("Error during verification:", error);
    return res.status(500).json({
      status: "Internal Server Error",
      code: 500,
      message: "Error during verification",
    });
  }
};
