import { number, object } from "zod";

export const publicPlaylistData = object({
    accountId: number().int(),
    playlistId: number().int()
})