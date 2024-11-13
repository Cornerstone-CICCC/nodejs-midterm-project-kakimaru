import { Router } from "express";
import userController from "../controllers/user.controller";
import { checkAuth } from "../middleware/auth";

const userRouter = Router();

userRouter.get("/list", userController.getUsers);
userRouter.get("/list/:id", userController.getUserById);
userRouter.post("/register", userController.registerUser);
userRouter.post("/login", userController.loginUser);
// userRouter.get("/profile", checkAuth, userController.userProfile);
userRouter.get("/logout", checkAuth, userController.logoutUser);

export default userRouter;
