
import 'dotenv/config';
import {DataSource} from 'typeorm';

import { fileURLToPath } from "url";
import { dirname } from "path";

import { Products } from '../models/product_model.ts';
import { Category } from '../models/category_model.ts';
import { Users } from '../models/user_model.ts';
import { Roles } from '../models/role_model.ts';

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
        Category,
        Users,
        Roles
    ],

    migrations:[
        __dirname + "/../migrations/*{.js,.ts}"
    ],
});
