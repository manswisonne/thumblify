import Express from "express";
import { deleteThumbnail, generateThumbnail } from "../controllers/ThumbnailController";
import protect from "../middlewares/auth";
const ThumbnailRouter = Express.Router();
ThumbnailRouter.post('/generate', protect,generateThumbnail)
ThumbnailRouter.delete('/delete/:id', protect,deleteThumbnail)

export default ThumbnailRouter;