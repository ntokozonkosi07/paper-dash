import { Scheme } from "./scheme.model";

export class Development {
    
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public schemes: Scheme[]
    ) { }
}