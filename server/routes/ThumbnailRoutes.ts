import Express from "express";
import { deleteThumbnail, generateThumbnail } from "../controllers/ThumbnailController.js";
import {protect} from "../middlewares/auth.js";
const ThumbnailRouter = Express.Router();
ThumbnailRouter.post('/generate', auth,generateThumbnail)
ThumbnailRouter.delete('/delete/:id', auth,deleteThumbnail)

export default ThumbnailRouter;
