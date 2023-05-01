import {Cv} from "./cv";
import {Skill} from "./skill";

export enum Role {USER = "USER",ADMIN = "ADMIN"}
export class User{
    constructor(
        public id : string,
        public name : string,
        public email : string,
        public role : Role,
        public Cvs : Array<Cv>
    ) {
    }

}