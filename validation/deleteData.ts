import { number, object } from "zod";

export const deleteVideo = object({
    videoId: number().int().positive(),
    accountId: number().int().positive()
})

export const deletePlaylistVideo = object({
    videoId: number().int().positive(),
    playlistId: number().int().positive(),
    accountId: number().int().positive(),
})

export const deletePlaylist = object({
    playlistId: number().int().positive(),
    accountId: number().int().positive()
})

