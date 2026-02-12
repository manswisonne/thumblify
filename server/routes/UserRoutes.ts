import express from "express";
import { getUserThumbnails, getThumbnailById } from "../controllers/UserController.js";
import {protect }from "../middlewares/auth.js";
const UserRouter = express.Router();
UserRouter.get('/thumbnails',protect,getUserThumbnails);
UserRouter.get('/thumbnail/:id',protect,getThumbnailById);
export default UserRouter;
// routes for user-related operations
