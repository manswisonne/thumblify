import Express from "express";
import { deleteThumbnail, generateThumbnail } from "../controllers/ThumbnailController.js";
import {protect} from "../middlewares/auth.js";
const ThumbnailRouter = Express.Router();
ThumbnailRouter.post('/generate', protect,generateThumbnail)
ThumbnailRouter.delete('/delete/:id', protect,deleteThumbnail)

export default ThumbnailRouter;
