
import { email, number, object, string } from "zod";

export const userPaylistData = object({
    userId: number(),
    playlistId: number(),
    title: string(),
}) 

