import express from "express";
const router = express.Router();
import { bodyValidate } from "../middlewares/validator.js";
import { addUserSchema } from "../controller/users.js";
import { signup } from "../controllers/users/register.js";
import { getUsers } from "../controllers/users/getUsers.js";
import { login } from "../controllers/users/logIn.js";
import { logout } from "../controllers/users/logOut.js";
import { current } from "../controllers/users/currentuser.js";
import { auth } from "../controller/users.js";
import { avatar } from "../controllers/users/avatar.js";
import { upload } from "../config/config-multer.js";
import { verifyUser } from "../controllers/users/verification.js";
import { resendVerificationEmail } from "../controllers/mail/resendMail.js";

router.get("/", getUsers);
router.post("/signup", bodyValidate(addUserSchema), signup);
router.post("/login", login);
router.get("/logout", auth, logout);
router.get("/current", auth, current);
router.patch("/avatars", auth, upload.single("avatar"), avatar);
router.get("/verify/:verificationToken", verifyUser);
router.post("/verify", resendVerificationEmail);

export default router;
