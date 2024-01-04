import { Blog } from "./blog"

export type User = {
    username: string,
    name: string,
    id: number
    blogs?: Blog[]
}