import { User } from "./user"

export type Blog = {
    content: string,
    important: boolean
    userId?: number,
    id?: number
    date?: string
    user?: User
}