import { number, object, string, enum as Enum } from "zod";

export const addVideo = object({
    title: string(),
    description: string().optional(),
    link: string().url({protocol: /^https$/}),
})

const visibleEnum = Enum(["public", "private"])

export const addPlaylist = object({
    title: string(),
    description: string().optional(),
    visible: visibleEnum,
})

export const addPlaylistVideo = object({
    title: string(),
    description: string().optional(),
    link: string().url({protocol: /^https$/}),
    playlistId: number(),
})

