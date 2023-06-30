import {Achievement} from "./AchievementType";

export type User ={
    id:string,
    userName:string,
    password:string,
    achievement: Achievement[]
}

export type UserDTO ={
    id:string,
    userName:string
    achievement: Achievement[]
}