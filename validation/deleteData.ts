import { number, object } from "zod";

export const deleteVideo = object({
    videoId: number(),
    accountId: number()
})