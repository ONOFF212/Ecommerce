
import multer from "@koa/multer";
import { randomUUID } from "crypto";

import path from 'path'; 
import fs from 'fs';


const imageFolderPath = path.resolve('uploads');

const storage = multer.diskStorage({
    destination:(req, file, cb) => {

        if(!fs.existsSync(imageFolderPath)) {
            fs.mkdirSync(imageFolderPath, {recursive:true});
        }

        cb(null, imageFolderPath);
    },
    filename:(req, file, cb) => {
        cb(null, `${Date.now()}-${randomUUID()}-${file.originalname}`);
    }
});

const fileFilter = (req:any, file:any, cb:any) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const allowedExtensions = /jpeg|jpg|png|webp/;

    const hasValidExtension = allowedExtensions.test(path.extname(file.originalname).toLowerCase());
    const hasValidMimeType = allowedMimeTypes.includes(file.mimetype);

    if(hasValidExtension && hasValidMimeType) {
        return cb(null, true);
    }else{
        cb(new Error ('Only .png, .jpg, jpeg, adn .webp image files are allowed'), false);
    }
};

export const upload = multer({storage, fileFilter, limits:{fileSize : 2.5 * 1024 * 1024}});