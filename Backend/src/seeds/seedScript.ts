
import { db_Connection } from "../dbConfig/dbconfig.js";

import { Products } from "../Models/produtcModel.js";
import { Category } from "../Models/categoryModel.js";
// const path = require("path");

export const seedDatabase = async () => {
    try {
        if (!db_Connection.isInitialized) {
            await db_Connection.initialize();
            console.log("Database connected successfully...");
        }

        const categoryRepo = db_Connection.getRepository(Category);
        const productRepo = db_Connection.getRepository(Products);

        const categoryData = [
            { Name: "Health & Beauty" },
            { Name: "Electronics & Media" },
            { Name: "Fashion & Apparel" },
            { Name: "Home & Lifestyle" }
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
            category => category.Name === "Electronics & Media"
        );

        const fashion = savedCategories.find(
            category => category.Name === "Fashion & Apparel"
        );

        const health = savedCategories.find(
            category => category.Name === "Health & Beauty"
        );

        const home = savedCategories.find(
            category => category.Name === "Home & Lifestyle"
        );

        const productData = [
                //Electronic and Devices
                {Name:'Desktop', Description:'A powerful stationary computer built for heavy multitasking, productivity, and high-performance gaming.',     Price:'Rs 77,000',    Stock:"100",   imgUrl:'desktop.jpg', category:electronics },
                {Name:'Laptop',  Description:'A portable and lightweight computer ideal for working, studying, or entertainment on the go.',                Price:'Rs 90,000',    Stock:"157",   imgUrl:'laptop.jpg',  category:electronics },  
                {Name:'Iphone',  Description:'A premium smartphone featuring a sleek design, advanced camera systems, and a seamless user interface.',      Price:'Rs 1,22,000',  Stock:"77",    imgUrl:'ip.jpg',      category:electronics },
                {Name:'TV',      Description:'A smart streaming media player that connects to your television to deliver apps, movies, and live channels.', Price:'Rs 1,50,000',  Stock:"400",   imgUrl:'tv.jpg',      category:electronics },              
                {Name:'Camera',  Description:'A high-resolution digital camera designed to capture professional-grade photos and crisp videos.',            Price:'Rs 1,000,000', Stock:"5",     imgUrl:'camera.jpg',  category:electronics },
                                
                //Fashion and Apparel
                {Name:'BoxPant', Description:'Versatile and comfortable trousers tailored for both casual outings and professional settings.',    Price:'Rs 800',   Stock:'200',   imgUrl:'boxpants.jpg', category:fashion },
                {Name:'Shirt',   Description:'A classic button-down shirt made from breathable fabric, perfect for formal or smart-casual wear.', Price:'Rs 1,200', Stock:'221',   imgUrl:'shirt.jpg',    category:fashion },
                {Name:'T-shirt', Description:'A soft, everyday cotton tee designed for maximum comfort and a relaxed fit.',                       Price:'Rs 700',   Stock:'119',   imgUrl:'tshirt.jpg',   category:fashion },
                {Name:'Shoes',   Description:'footwear excellent support for daily walking or athletic activities.',                              Price:'Rs1,300',  Stock:'90',    imgUrl:'shoes.jpg',    category:fashion },
                {Name:'Shoes',   Description:'Durable and stylish footwear engineered to provide for athletic activities.',                       Price:'Rs 1,500', Stock:'100',   imgUrl:'shoe.jpg',     category:fashion },

                //Health & Beauty
                {Name:'Facem',          Description:'A nourishing facial oil packed with vitamins to deeply hydrate and restore your skins natural glow.',       Price:'Rs 400',   Stock:'44',  imgUrl:'facem.jpg',        category:health },
                {Name:'Treatment Oil',  Description:'A lightweight, broad-spectrum SPF lotion that protects the skin from harmful UV rays and premature aging.', Price:'Rs 800',   Stock:'555', imgUrl:'TreatmentOil.jpg', category:health },
                {Name:'Sunscreen',      Description:'Lotion that protects the skin from harmful UV rays.',                                                       Price:'Rs 350',   Stock:'100', imgUrl:'sunscreen.jpg',    category:health },
                {Name:'Sunscreen',      Description:'A lightweight, broad-spectrum SPF lotion that protects the skin from  UV rays and premature aging.',        Price:'Rs 550',   Stock:'25',  imgUrl:'sunscreen1.jpg',   category:health },
                {Name:'Facial Cleaner', Description:'A gentle, foaming face wash that removes dirt, oil, and impurities without stripping away moisture.',       Price:'Rs 1,100', Stock:'10',  imgUrl:'health.jpg',       category:health },

                //Home & Lifestyle
                {Name:'Sofa',          Description:'A plush, multi-seater couch designed to bring ultimate comfort and modern style to your living room.',  Price:'Rs 150,000', Stock:'5',   imgUrl:'sofa.jpg',                category:home },
                {Name:'Coffe Table',   Description:'A sleek and sturdy central living room table perfect for holding drinks, books, and decor items.',      Price:'Rs 25,000',  Stock:'66',  imgUrl:'coffetable.jpg',          category:home },
                {Name:'Woven baskets', Description:'Decorative and functional storage bins handcrafted from natural fibers to keep your space organized.',  Price:'Rs 500',     Stock:'119', imgUrl:'Wovenstoragebaskets.jpg', category:home },
                {Name:'Pillow',        Description:'A soft, supportive cushion engineered to provide optimal neck alignment for a restful sleep',           Price:'Rs 999',     Stock:'99',  imgUrl:'pillow.jpg',              category:home },
                {Name:'Blanket',       Description:'A warm, cozy, and breathable throw blanket perfect for layering on your bed or lounging on the couch.', Price:'Rs 1,900',   Stock:'55',  imgUrl:'blanket.jpg',             category:home }
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
