import jimp from "jimp";
import path from "path";
import fs from "fs/promises";
import {getUser} from "../../controllers/users/getUser.js"

const storeAvatar = path.join(process.cwd(), "public/avatars");

export const avatar = async (req, res, next) => {
  const { path: temporaryName, originalname } = req.file;
  const newAvatarFileName = `${req.user._id.toString()}.jpg`;
  const newAvatarPath = path.join(storeAvatar, newAvatarFileName);
  newAvatarPath;
  try {
    const avatar = await jimp.read(temporaryName);
    await avatar.cover(250, 250).quality(60).write(newAvatarPath);
    await fs.unlink(temporaryName);
  } catch (err) {
    return next(err);
  }

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
    } else {
      user.avatarURL = `/avatars/${newAvatarFileName}`;
      return res.json({
        status: "success",
        code: 200,
        data: { avatarURL: user.avatarURL },
      });
    }
  } catch (error) {
    console.error(error);
  }
};