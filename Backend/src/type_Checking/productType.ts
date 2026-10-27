
import * as yup from "yup";

export interface updateProductTypes{
    id:number,
    img_url:string,
    name:string,
    price:number,
    stock:number,
    description:string,
    category:string
}

export const productSchema = yup.object({
    name:yup.string().required(),
    //img_url:yup.string().required(),
    price:yup.number().required(),
    stock:yup.number().required(),
    description:yup.string().required(),
    category:yup.string().required()
});

type productVerify = yup.InferType<typeof productSchema>;

export interface saveProductTypes{
    img_url:string,
    name:string,
    price:number,
    stock:number,
    description:string,
    categoryId:number,
}

// export interface getProductTypes{
//     search:string,
//     category:string,
//     sort:string,
//     page:number,
//     limit:number,
//     minPrice:number,
//     maxPrice:number
// }

