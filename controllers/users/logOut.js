
export const logout = async (req, res) => {
  const { user } = req;

  try {
    user.token = null;
    await user.save();

    return res.status(204).send();
  } catch (error) {
    return res.status(401).json({
      status: "Unauthorized",
      code: 401,
      message: `Incorrect login or password, ${error.message}`,
      data: "Bad request",
    });
  }
};