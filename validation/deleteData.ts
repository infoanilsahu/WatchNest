import { number, object } from "zod";

export const deleteVideo = object({
    videoId: number().int().positive(),
    accountId: number().int().positive()
})