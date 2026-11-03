
import 'dotenv/config';
import {DataSource} from 'typeorm';

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const AppDataSource = new DataSource({
    type     :"postgres",
    port     :Number(process.env.DB_PORT),
    host     :process.env.DB_HOST,
    username :process.env.DB_USER,
    password :process.env.DB_PASSWORD,
    database :process.env.DB_NAME,

    synchronize:false,
    logging:false,

    entities: process.env.NODE_ENV==='production' ? ["dist/entities/**.js"] : ["src/entities/**.ts"],

    migrations:[
        __dirname + "/../migrations/*{.js,.ts}"
    ],
});
