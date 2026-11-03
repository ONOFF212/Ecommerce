
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

import { AppDataSource } from './db-config/db-config.ts';
import { adminProductRouter } from './routes/admin-products-routes.ts';
import { adminCategoryRouter } from './routes/admin-categories-routes.ts';
import { roleRouter } from './routes/role-routes.ts';
import { authRouter } from './routes/auth-routes.ts';
import { userRouter } from './routes/user-routes.ts';
import { seedDatabase } from './seeds/products-seed.ts'
import { seedDbRole } from './seeds/role-seed.ts';


const app = new Koa();

app.use(cors({
    allowHeaders:['Content-Type', "Authorization"],
    exposeHeaders:['X-Total-Count'],
    credentials:true,
    origin:"http://localhost:3000",
    // allowMethods:["GET", "POST", "PUT", "DELETE", "PATCH"],
}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(bodyParser());

const imageFolderPath = Path.join(__dirname, "..", 'uploads'); 
app.use(mount('/uploads', serve(imageFolderPath)));

app.use(jwt({secret:String(process.env.JWT_KEY)}).unless({path:[/^\/public/]}));

app.use(authRouter.routes());
app.use(userRouter.routes());
app.use(adminCategoryRouter.routes());
app.use(adminProductRouter.routes());
app.use(roleRouter.routes());

const startServer = async () => {
    try {
        await AppDataSource.initialize();

        await seedDatabase();
        await seedDbRole();
        app.listen(Number(process.env.PORT), () => {
            console.log(
                `Server is running at port: ${(process.env.PORT)}`
            );
        });
    } catch (error) {
        console.error("Server startup failed:");
        console.error(error);
    }
};

startServer();