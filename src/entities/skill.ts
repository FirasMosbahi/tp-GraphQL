import {Cv} from "./cv";

export class Skill {
    constructor(
        public id : string,
        public designation : string,
        public cvs : Array<Cv>
    ) {
    }
}