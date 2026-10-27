
import { AppDataSource } from "../dbconfig/db_config.ts";

import { Products } from "../entity/productEntity.ts";
import { Category } from "../entity/categoryEntity.ts";
// const path = require("path");

export const seedDatabase = async () => {
    try {
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
            console.log("Database connected successfully...");
        }

        const categoryRepo = AppDataSource.getRepository(Category);
        const productRepo = AppDataSource.getRepository(Products);

        const categoryData = [
            { name: "Health & Beauty" },
            { name: "Electronics & Media" },
            { name: "Fashion & Apparel" },
            { name: "Home & Lifestyle" }
        ];

        let savedCategories = await categoryRepo.find();

        if (savedCategories.length === 0) {
            const categoryEntities = categoryRepo.create(categoryData);
            savedCategories = await categoryRepo.save(categoryEntities);

            console.log("Categories created successfully.");
        } else {
            console.log("Categories already exist.");
        }

        const electronics = savedCategories.find(
            category => category.name === "Electronics & Media"
        );

        const fashion = savedCategories.find(
            category => category.name === "Fashion & Apparel"
        );

        const health = savedCategories.find(
            category => category.name === "Health & Beauty"
        );

        const home = savedCategories.find(
            category => category.name === "Home & Lifestyle"
        );

        const productData = [
                //Electronics and Media
                {name:'Desktop', description:'A powerful stationary computer built for heavy multitasking, productivity, and high-performance gaming.',     price: 77000,    stock: 100,   img_url:'desktop.jpg', category:electronics },
                {name:'Laptop',  description:'A portable and lightweight computer ideal for working, studying, or entertainment on the go.',                price: 90000,    stock: 157,   img_url:'laptop.jpg',  category:electronics },  
                {name:'Iphone',  description:'A premium smartphone featuring a sleek design, advanced camera systems, and a seamless user interface.',      price: 122000,   stock: 77,    img_url:'ip.jpg',      category:electronics },
                {name:'TV',      description:'A smart streaming media player that connects to your television to deliver apps, movies, and live channels.', price: 150000,   stock: 400,   img_url:'tv.jpg',      category:electronics },              
                {name:'Camera',  description:'A high-resolution digital camera designed to capture professional-grade photos and crisp videos.',            price: 1000000,  stock: 5,     img_url:'camera.jpg',  category:electronics },
                                
                //Fashion and Apparel
                {name:'BoxPant', description:'Versatile and comfortable trousers tailored for both casual outings and professional settings.',    price:    800,   stock: 200,   img_url:'boxpants.jpg', category:fashion },
                {name:'Shirt',   description:'A classic button-down shirt made from breathable fabric, perfect for formal or smart-casual wear.', price:    1200,  stock: 221,   img_url:'shirt.jpg',    category:fashion },
                {name:'T-shirt', description:'A soft, everyday cotton tee designed for maximum comfort and a relaxed fit.',                       price:    700,   stock: 119,   img_url:'tshirt.jpg',   category:fashion },
                {name:'Shoes',   description:'footwear excellent support for daily walking or athletic activities.',                              price:    1300,  stock: 90,    img_url:'shoes.jpg',    category:fashion },
                {name:'Shoes',   description:'Durable and stylish footwear engineered to provide for athletic activities.',                       price:    1500,  stock: 100,   img_url:'shoe.jpg',     category:fashion },

                //Health & Beauty
                {name:'Facem',          description:'A nourishing facial oil packed with vitamins to deeply hydrate and restore your skins natural glow.',       price:   400,   stock: 44,  img_url:'facem.jpg',        category:health },
                {name:'Treatment Oil',  description:'A lightweight, broad-spectrum SPF lotion that protects the skin from harmful UV rays and premature aging.', price:   800,   stock: 555, img_url:'TreatmentOil.jpg', category:health },
                {name:'Sunscreen',      description:'Lotion that protects the skin from harmful UV rays.',                                                       price:   350,   stock: 100, img_url:'sunscreen.jpg',    category:health },
                {name:'Sunscreen',      description:'A lightweight, broad-spectrum SPF lotion that protects the skin from  UV rays and premature aging.',        price:   550,   stock: 25,  img_url:'sunscreen1.jpg',   category:health },
                {name:'Facial Cleaner', description:'A gentle, foaming face wash that removes dirt, oil, and impurities without stripping away moisture.',       price:   1100,  stock: 10,  img_url:'health.jpg',       category:health },

                //Home & Lifestyle
                {name:'Sofa',          description:'A plush, multi-seater couch designed to bring ultimate comfort and modern style to your living room.',  price:   150000,  stock:  5,   img_url:'sofa.jpg',                category:home },
                {name:'Coffe Table',   description:'A sleek and sturdy central living room table perfect for holding drinks, books, and decor items.',      price:   25000,   stock:  66,  img_url:'coffetable.jpg',          category:home },
                {name:'Woven baskets', description:'Decorative and functional storage bins handcrafted from natural fibers to keep your space organized.',  price:   500,     stock:  119, img_url:'Wovenstoragebaskets.jpg', category:home },
                {name:'Pillow',        description:'A soft, supportive cushion engineered to provide optimal neck alignment for a restful sleep',           price:   999,     stock:  99,  img_url:'pillow.jpg',              category:home },
                {name:'Blanket',       description:'A warm, cozy, and breathable throw blanket perfect for layering on your bed or lounging on the couch.', price:   1900,    stock:  55,  img_url:'blanket.jpg',             category:home }
            ]; 
 
        let savedProducts = await productRepo.find();

         if (savedProducts.length === 0) {
            const productEntities = productRepo.create(productData); 
            const savedProducts = await productRepo.save(productEntities); 

            console.log("Product created successfully.");
        } else {
            console.log("Product already exist.");
        }


        console.log("Seed data inserted successfully.");

    } catch (error) {
        console.error("Failed to seed database:");
        console.error(error);
    }
};
