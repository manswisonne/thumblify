import express from "express";
import { getUserThumbnails, getThumbnailById } from "../controllers/UserController.js";
import {auth}from "../middlewares/auth.js";
const UserRouter = express.Router();
UserRouter.get('/thumbnails',auth,getUserThumbnails);
UserRouter.get('/thumbnail/:id',auth,getThumbnailById);
export default UserRouter;
// routes for user-related operations
