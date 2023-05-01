import {Skill} from "./skill";
import {User} from "./user";

export class Cv{
    constructor(
        public id : string,
        public name : string,
        public age : number,
        public job : string,
        public skills : Array<Skill>,
        public user : User,
    ) {
    }
}