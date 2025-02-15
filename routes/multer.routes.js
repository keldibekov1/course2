import multer from "../multer/multer.js";
import { Router } from "express";


const multerRoute = Router();


multerRoute.post("/upload", multer.single("file"), (req, res) => {
    res.json( `/${req.file.path}` );
    });

export default multerRoute;