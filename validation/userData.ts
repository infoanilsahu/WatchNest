
import { email, number, object, string } from "zod";

export const userPaylistData = object({
    accountId: number().int().positive(),
    playlistId: number().int().positive(),
    title: string().optional(),
}) 

