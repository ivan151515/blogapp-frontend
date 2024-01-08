import { User } from "./user"

export type Comment = {
    content: string,
    id: number,
    userId?: number,
    user?: User
    blogId: number
}