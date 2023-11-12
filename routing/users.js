import express from "express";
const router = express.Router();
import { bodyValidate } from "../middlewares/validator.js";
import { addUserSchema } from "../controller/users.js";
import { userSchema } from "../models/users.js";
import { signup } from "../controllers/users/register.js";
import { getUsers } from "../controllers/users/getUsers.js";
import { login } from "../controllers/users/logIn.js";
import { logout } from "../controllers/users/logOut.js";
import { current } from "../controllers/users/currentuser.js";
import { auth } from "../controller/users.js";

router.get("/", getUsers);
router.post("/signup",bodyValidate(addUserSchema) ,signup);
router.post("/login", login);
router.get("/logout", auth, logout);
router.get("/current", auth, current);

export default router;