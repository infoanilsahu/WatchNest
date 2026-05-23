
import { email, number, object, string } from "zod";

export const userPaylistData = object({
    accountId: number(),
    playlistId: number(),
    title: string().optional(),
}) 

