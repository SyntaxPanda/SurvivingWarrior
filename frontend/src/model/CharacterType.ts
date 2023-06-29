import {Item} from "./ItemType";

export type Character = {
    name:string,
    id:string,
    level:number,
    exp:number,
    skillPoints:number,
    life:number,
    maxLife:number,
    damage:number,
    gold:number,
    item:Item[]
}