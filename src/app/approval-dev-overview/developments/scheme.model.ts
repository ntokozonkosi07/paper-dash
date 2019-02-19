import { SchemeMeta } from "./scheme-meta.model";

export class Scheme extends SchemeMeta{
    constructor(        
        public id: string,
        public propertyType: number,
        public size: number,
        public erf: number,
        public bedroom: number,
        public kitchen: number,
        public lounge: number,
        public office: number,
        public price: number,
        public garage: number,
        public carport: number,
        public address: string,
        public description: string,
    ) { 
        super(true,false);
    }
    
}