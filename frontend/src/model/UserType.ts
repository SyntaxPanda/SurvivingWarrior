import {Achievement} from "./AchievementType";

export type User ={
    id:string,
    username:string,
    password:string,
    achievements: Achievement[]
    dragonCounter:number;
    levelCounter:number;
    goldCounter:number;
    achievementPoints:number;
    skillPoints:number;
}

export type UserDTO ={
    id:string,
    username:string
    achievements: Achievement[]
    dragonCounter:number;
    levelCounter:number;
    goldCounter:number;
    achievementPoints:number;
    skillPoints:number;
}