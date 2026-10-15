
import { AppDataSource } from "../dbconfig/db_config.ts";

import { Roles } from "../entity/roleEntity.ts";

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

        console.log("Seed data inserted successfully.");

    } catch (error) {
        console.error("Failed to seed database:");
        console.error(error);
    }
};
