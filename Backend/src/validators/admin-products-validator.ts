
import * as yup from "yup";

export interface UpdateProduct{
    id:number,
    imgUrl:string,
    name:string,
    price:number,
    stock:number,
    description:string,
    category:string
}

export const productSchema = yup.object({
    name:yup.string().required(),
    price:yup.number().required(),
    stock:yup.number().required(),
    description:yup.string().required(),
    category:yup.number().required()
});

export type ProductInput = yup.InferType<typeof productSchema>;

export interface CreateProduct{
    imgUrl:string,
    name:string,
    price:number,
    stock:number,
    description:string,
    categoryId:number,
}



