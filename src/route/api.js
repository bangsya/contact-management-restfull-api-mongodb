import express from "express";
import { authMiddleware } from "../middleware/auth-middleware.js";
import userController from "../controller/user-controller.js";
import contactController from "../controller/contact-controller.js";

const userRouter = express.Router();
userRouter.use(authMiddleware);

// user API
userRouter.get("/api/users/current", userController.get);
userRouter.patch("/api/users/current", userController.update);
userRouter.delete("/api/users/logout", userController.logout);

// contact API
userRouter.post("/api/contacts", contactController.create);
userRouter.get("/api/contacts/:id", contactController.get);
userRouter.put("/api/contacts/:id", contactController.update);
userRouter.delete("/api/contacts/:id", contactController.deleteContact);
userRouter.get("/api/contacts", contactController.search);

export { userRouter };
