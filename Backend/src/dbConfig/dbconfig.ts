
import 'dotenv/config';
import {DataSource} from 'typeorm';

import { fileURLToPath } from "url";
import { dirname } from "path";

import { Products } from '../Models/produtcModel.js';
import { Category } from '../Models/categoryModel.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const db_Connection = new DataSource({
    type     :"postgres",
    port     :Number(process.env.DB_PORT),
    host     :process.env.DB_HOST,
    username :process.env.DB_USER,
    password :process.env.DB_PASSWORD,
    database :process.env.DB_NAME,

    synchronize:false,
    logging:false,

    entities:[
        Products,
        Category
    ],

    migrations:[
        __dirname + "/../migrations/*{.js,.ts}"
    ],
});
