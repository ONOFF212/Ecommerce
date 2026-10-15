
import Koa from 'koa';
import 'dotenv/config';
import Path from 'path';
import cors from "@koa/cors";

import bodyParser from "koa-bodyparser";
import serve from "koa-static";
import mount from "koa-mount";

import { fileURLToPath } from "url";
import { dirname } from "path";

import { AppDataSource } from './dbconfig/db_config.ts';
import {product_router } from './routes/productRoutes.ts';
import { auth_router } from './routes/authRoutes.ts';
import { user_routes } from './routes/userRoutes.ts';
import { seedDatabase } from './seeds/seedScript.ts'
import { seedDbRole } from './seeds/roleScript.ts';

import {jwtAuthMiddlware} from './middlewares/jwtAuthMiddleware.ts';
import { rolebasemiddleware } from './middlewares/roleBaseMiddleware.ts';

const app = new Koa();

app.use(cors({
    exposeHeaders:['Authorization', 'X-Total-Count'],
    credentials: true,
    origin:"http://localhost:3000"
}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(bodyParser());

const imageFolderPath = Path.join(__dirname, "..", 'img'); 
console.log(__dirname);
app.use(mount('/img', serve(imageFolderPath)));

app.use(auth_router.routes());
app.use(product_router.routes());
app.use(jwtAuthMiddlware);

//app.use(rolebasemiddleware);
app.use(user_routes.routes());

const startServer = async () => {
    try {
        await AppDataSource.initialize();
        
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