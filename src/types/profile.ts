import { User } from "./user";

export interface Profile extends User {
    bio?: string,
    age?: number,
    created?: boolean,
    occupation?: string,
}