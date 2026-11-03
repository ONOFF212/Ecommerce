
import * as yup from "yup";

export const roleSchema = yup.object({
    name:yup.string().required(),
});

export type RoleInput = yup.InferType<typeof roleSchema>;
