
import * as yup from "yup";

export const categorySchema = yup.object({
    name:yup.string().required(),
    id:yup.number().required()
});

type categoryVerify = yup.InferType<typeof categorySchema>;

export interface categorysType{
    id:number,
    name:string
}