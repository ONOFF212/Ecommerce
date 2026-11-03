
import * as yup from "yup";

export const categorySchema = yup.object({
    name:yup.string().required(),
});

export type CategoryInput = yup.InferType<typeof categorySchema>;
