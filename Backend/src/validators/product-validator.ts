
import * as yup from "yup";

export const queryParmasSchema = yup.object({
    search:yup.string().optional(),
    category:yup.string().optional(),
    sort:yup.string().optional(),
    page:yup.number().integer().min(1).default(1),
    limit:yup.number().integer().min(1).default(8),
    minPrice:yup.number().transform((value, originalValue) => originalValue === '' || originalValue === null ? undefined : value).optional(),
    maxPrice:yup.number().transform((value, originalValue) => originalValue === '' || originalValue === null ? undefined : value).optional(),
});

type Queryparams = yup.InferType<typeof queryParmasSchema>;

export interface QueryParams{
    search?:string,
    category?:string,
    sort?:string,
    page:number,
    limit:number,
    minPrice?:number | null,
    maxPrice?:number | null,
}