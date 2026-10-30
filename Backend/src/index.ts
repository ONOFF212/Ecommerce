
import Koa from 'koa';
import 'dotenv/config';
import Path from 'path';
import cors from "@koa/cors";
import jwt from 'koa-jwt';

import bodyParser from "koa-bodyparser";
import serve from "koa-static";
import mount from "koa-mount";

import { fileURLToPath } from "url";
import { dirname } from "path";

import { AppDataSource } from './dbconfig/db_config.ts';
import { product_router } from './routes/productRoute.ts';
import {adminProductRouter} from './routes/adminProductRoutes.ts';
import {adminCategoryRouter} from './routes/adminCategoryRoutes.ts';
import { auth_router } from './routes/authRoutes.ts';
import { user_routes } from './routes/userRoutes.ts';
import { seedDatabase } from './seeds/seedScript.ts'
import { seedDbRole } from './seeds/roleScript.ts';

import {jwtAuthMiddlware} from './middlewares/jwtAuthMiddleware.ts';


const app = new Koa();

app.use(cors({
    exposeHeaders:['Authorization', 'X-Total-Count'],
    credentials: true,
    origin:"http://localhost:3000",
}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(bodyParser());

const imageFolderPath = Path.join(__dirname, "..", 'img'); 
app.use(mount('/img', serve(imageFolderPath)));

app.use(auth_router.routes());
app.use(product_router.routes());
//app.use(jwtAuthMiddlware);

app.use(jwt({secret:String(process.env.JWT_KEY)}));
app.use(user_routes.routes());
app.use(adminCategoryRouter.routes());
app.use(adminProductRouter.routes());

const startServer = async () => {
    try {
        await AppDataSource.initialize();

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