
import { db_Connection } from "../dbconfig/db_config.ts";

import { Roles } from "../models/role_model.ts";

export const seedDbRole = async () => {
    try {
        if (!db_Connection.isInitialized) {
            await db_Connection.initialize();
            console.log("Database connected successfully...");
        }

        const roleRepo = db_Connection.getRepository(Roles);

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

        console.log("Seed data inserted successfully.");

    } catch (error) {
        console.error("Failed to seed database:");
        console.error(error);
    }
};
