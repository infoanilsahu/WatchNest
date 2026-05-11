import { number, object, string, ZodISODateTime } from "zod";

export const addVideo = object({
    title: string(),
    description: string(),
    link: string().url({protocol: /^https$/}),
})