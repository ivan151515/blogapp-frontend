import { Blog } from "./blog";

export interface Profile {
    bio?: string,
    age?: number,
    created?: boolean,
    occupation?: string,
    blogs?: Blog[]
}

export type UpdateProfile = {
    bio?: string,
    age?: number,
    occupation?: string,
    id: number,
    token: string
}