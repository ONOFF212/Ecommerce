
import { Between, ILike, MoreThanOrEqual } from "typeorm";
import { AppDataSource } from "../dbconfig/db_config.ts";
import { Products } from "../entity/productEntity.ts";

const productRepo = AppDataSource.getRepository(Products);

// export  const fetchProducts = async (sort:string, minPrice:number, maxPrice:number, page:number, limit:number)  => {
//     const [product, count] = await productRepo.findAndCount({
//         where:{
//             ...( minPrice != 0 && minPrice != null && {
//                  price: LessThanOrEqual(minPrice) 
//             }),
//             ...(maxPrice != 0 && maxPrice != null &&{ 
//                 price: MoreThanOrEqual(maxPrice) 
//             }),
//         },
//         relations:{
//             category:true,
//         },
//         order:{
//             ...(sort === "ASC" && {
//                 price: "ASC",
//             }),
//             ...(sort === 'DESC'&&{
//                 price:"DESC",
//             }),
//             ...(sort === 'A-Z' && {
//                 name: "ASC"
//             }),
//             ...(sort === 'Z-A' && {
//                 name:"DESC"
//             })
//         },
//         skip:(page -1) * limit,
//         take:limit,
//     });

    
//     return {product, count, currentPage:page, totalPage:Math.ceil(count/limit)};
// };

export  const fetchProducts = async (search:string, category:string, sort:string, minPrice:number, maxPrice:number, page:number, limit:number)  => {
    
    const [product, count] = await productRepo.findAndCount({
        where:{
            ...(search != null && typeof search === 'string' && {
                name: ILike( `%${search}%` ),
            }),
            ...(category != null && typeof category === 'string' && {
                category:{
                    name: ILike( `%${category}%` ),
                }
            }),
            ...(minPrice != null && minPrice > 0 && {
                price:(maxPrice != null && maxPrice >= minPrice)
                    ? Between(minPrice, maxPrice) : MoreThanOrEqual(minPrice),
            }),
        },
        select:{
            id:true,
            name:true,
            description:true,
            price:true,
            stock:true,
            img_url:true,
            category:true,
        },
        relations:{
            category:true,
        },
        order:{
            ...(sort === "ASC" && {
                price: "ASC",
            }),
            ...(sort === 'DESC'&&{
                price:"DESC",
            }),
            ...(sort === 'A-Z' && {
                name: "ASC"
            }),
            ...(sort === 'Z-A' && {
                name:"DESC"
            })
        },
        skip:( page - 1 ) * limit,
        take:limit
    });
    return {product, count, currentPage:page, totalPage:Math.ceil(count/limit)};
};

// export  const getItemByCategory = async (category:string, sort:string, minPrice:number, maxPrice:number, page:number, limit:number)  => {
    
//     const [product, count] = await productRepo.findAndCount({
//         where:{
//             category:{
//                 name:category,
//             },
//             ...(minPrice > 0 && minPrice != null &&{
//                 price:LessThanOrEqual(minPrice),
//             }),
//             ...(maxPrice > 0 && maxPrice != null && {
//                     price:MoreThanOrEqual(maxPrice),
//             }),
//         },
//         relations:{
//             category:true,
//         },
//         select:{
//             id:true,
//             name:true,
//             description:true,
//             price:true,
//             stock:true,
//             img_url:true,
//             category:{
//                 id:true,
//                 name:true,
//             },
//         },
//         order:{
//             ...(sort === "ASC" && {
//                 price: "ASC",
//             }),
//             ...(sort === 'DESC'&&{
//                 price:"DESC",
//             }),
//             ...(sort === 'A-Z' && {
//                 name: "ASC"
//             }),
//             ...(sort === 'Z-A' && {
//                 name:"DESC"
//             })
//         },
//         skip:( page - 1 ) * limit,
//         take:limit,
//     });
//     return {product, count, currentPage:page, totalPage:Math.ceil(count/limit)};

// };

export  async function getItemsById(id:number){

    return await productRepo.findOne({
        where:{
            id
        },
        relations:{
            category:true,
        }
    });
};