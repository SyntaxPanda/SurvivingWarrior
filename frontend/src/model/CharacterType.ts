import {Item} from "./ItemType";

export type Character = {
    name:string,
    id:string,
    level:number,
    exp:number,
    life:number,
    damage:number,
    gold:number,
    item:Item[]
}