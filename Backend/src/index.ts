
import Koa from 'koa';
import 'dotenv/config';
import "reflect-metadata";

import Path from 'path';
import cors from "@koa/cors";

import bodyParser from "koa-bodyparser";
import serve from "koa-static";
import mount from "koa-mount";

import { fileURLToPath } from "url";
import { dirname } from "path";


import { db_Connection } from './dbConfig/dbconfig.js';
import {router } from './routes/product_routes.js';
import { seedDatabase } from './seeds/seedScript.js'

const app = new Koa();

app.use(cors({
    origin:"http://localhost:3000"
}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(bodyParser());

const imageFolderPath = Path.join(__dirname, "..", 'img'); 
app.use(mount('/img', serve(imageFolderPath)));
//app.use(serve(imageFolderPath));


app.use(router.routes());

const startServer = async () => {
    try {
        await db_Connection.initialize();
        
        console.log("DB Connection Successful.....");

        await seedDatabase();
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