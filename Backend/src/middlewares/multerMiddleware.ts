
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

const fileFilter = (req:any, file:any, cb:any) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const allowedExtensions = /jpeg|jpg|png|webp/;

    const extName = allowedExtensions.test(Path.extname(file.originalname).toLowerCase());
    const mimeType = allowedMimeTypes.includes(file.mimetype);

    if(extName && mimeType) {
        return cb(null, true);
    }else{
        cb(new Error ('Only .png, .jpg, jpeg, adn .webp image files are allowed'), false);
    }
};

export const upload = multer({storage, fileFilter});