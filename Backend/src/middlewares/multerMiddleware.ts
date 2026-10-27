
import multer from "@koa/multer";

import Path from 'path'; 

const imageFolderPath = Path.resolve('img');

const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, imageFolderPath);
    },
    filename:(req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

export const upload = multer({storage});