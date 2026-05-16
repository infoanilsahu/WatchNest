import { number, object, string } from "zod";

export const changeVideoData = object({
    title: string(),
    description: string(),
    videoId: number().int().positive(),
    accountId: number().int().positive(),
})

