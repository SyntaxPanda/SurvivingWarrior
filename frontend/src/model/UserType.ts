import {Achievement} from "./AchievementType";

export type User ={
    id:string,
    userName:string,
    password:string,
    achievements: Achievement[]
    dragonCounter:number;
    levelCounter:number;
    goldCounter:number;
}

export type UserDTO ={
    id:string,
    userName:string
    achievements: Achievement[]
    dragonCounter:number;
    levelCounter:number;
    goldCounter:number;
}