import {Character} from "./CharacterType";
import {Story} from "./StoryType";

export type Game ={
    id:string,
    name:string,
    character:Character,
    story:Story
}