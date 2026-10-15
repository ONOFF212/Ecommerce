
import 'dotenv/config';
import {DataSource} from 'typeorm';

import { fileURLToPath } from "url";
import { dirname } from "path";

import { Products } from '../entity/productEntity.ts';
import { Category } from '../entity/categoryEntity.ts';
import { Users } from '../entity/userEntity.ts';
import { Roles } from '../entity/roleEntity.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const AppDataSource = new DataSource({ //TODO: AppDataSource
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
