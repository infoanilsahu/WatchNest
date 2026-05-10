import { object, string, number, email } from "zod";

export const token = object({
    userId: number().nonnegative(),
    accountId: number().nonnegative(),
    email: email().nonempty()
})