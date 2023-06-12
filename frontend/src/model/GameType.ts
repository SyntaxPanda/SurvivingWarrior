import {Character} from "./CharacterType";
import {Story} from "./StoryType";

export type Game ={
    id:string,
    gameName:string,
    character:Character,
    story:Story
}