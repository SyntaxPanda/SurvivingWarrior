import {Item} from "./ItemType";

export type Character = {
    name:string,
    characterId:string,
    level:number,
    exp:number,
    life:number,
    damage:number,
    gold:number,
    item:Item[]
}