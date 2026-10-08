
import Koa from 'koa';
import 'dotenv/config';
import Path from 'path';
import cors from "@koa/cors";

import bodyParser from "koa-bodyparser";
import serve from "koa-static";
import mount from "koa-mount";

import { fileURLToPath } from "url";
import { dirname } from "path";

import { db_Connection } from './dbconfig/db_config.ts';
import {product_router } from './routes/product_routes.ts';
import { auth_router } from './routes/auth_routes.ts';
import { user_routes } from './routes/user_routes.js';
import { seedDatabase } from './seeds/seed_script.ts'
import { seedDbRole } from './seeds/role_script.ts';

import {jwtAuthMiddlware} from './middlewares/jwt_authmiddleware.ts';
import { rolebasemiddleware } from './middlewares/role_basemiddleware.ts';

const app = new Koa();

// app.use(cors({
//     origin:"http://localhost:3000"
// }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(bodyParser());

const imageFolderPath = Path.join(__dirname, "..", 'img'); 
console.log(__dirname);
app.use(mount('/img', serve(imageFolderPath)));

app.use(auth_router.routes());
app.use(jwtAuthMiddlware);

//app.use(rolebasemiddleware);
app.use(user_routes.routes());
app.use(product_router.routes());

const startServer = async () => {
    try {
        await db_Connection.initialize();
        
        console.log("DB Connection Successful.....");

        await seedDatabase();
        await seedDbRole();
        app.listen(Number(process.env.PORT), () => {
            console.log(
                `Server is running at port: ${Number(process.env.PORT)}`
            );
        });
    } catch (error) {
        console.error("Server startup failed:");
        console.error(error);
    }
};

startServer();