import { object, string, number, email } from "zod";

export const account = object({
    email: email().nonempty(),
    username: string(),
    name: string(),
})