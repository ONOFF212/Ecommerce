
import { AppDataSource } from "../dbconfig/db_config.ts";
import 'dotenv/config';
import { Roles } from "../entity/roleEntity.ts";
import {Users} from "../entity/userEntity.ts";
import { hash_password } from "../utils/hashingSecrets.ts";
import { hash } from "crypto";


export const seedDbRole = async () => {
    try {
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
            console.log("Database connected successfully...");
        }

        const roleRepo = AppDataSource.getRepository(Roles);

        const roleData = [
            { name: "customer" },
            { name: "admin" },
            { name: "guest" }
        ];

        let savedRole = await roleRepo.find();

        if (savedRole.length === 0) {
            const roleEntities = roleRepo.create(roleData);
            savedRole = await roleRepo.save(roleEntities);

            console.log("Roles created successfully.");
        } else {
            console.log("Roles already exist.");
        }

        const userRepo = AppDataSource.getRepository(Users);
        const pass1 = String(process.env.ADMIN_PASS);
        const pass2 = String(process.env.ADMIN_PASS_2);
        const Admin = savedRole.find(
            role => role.name === "admin"
        );

        const hPassword = await hash_password(pass1);
        const hPassword2 = await hash_password(pass2);

        const adminData = [
            {name:"admin1", email:"admin1@gmail.com", password:hPassword, roles:Admin},
            {name:"admin2", email:"admin2@gmail.com", password:hPassword2, roles:Admin},
        ]

        let savedUser = await userRepo.find();
        if(savedUser.length === 0){
            const userRole = userRepo.create(adminData);
            savedUser = await userRepo.save(userRole);
            console.log("Admin created successfully....");
        }else {
            console.log("Admin already Exist......");
        }

        console.log("Seed data inserted successfully.");

    } catch (error) {
        console.error("Failed to seed database:");
        console.error(error);
    }
};
