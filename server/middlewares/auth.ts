import { Request , Response , NextFunction} from "express";
const protect = (req: Request, res: Response, next: NextFunction) => {
    if (req.session.isLoggedIn) {
        next();
    } else {

        res.status(401).json({ message: "Unauthorized" });
    }
    next();

}
export default protect;
// middleware to protect routes for authenticated users
