import { Province } from "./province";

export class Country {
    public id: number;
    public name: string;
    public provinces: Province[];
    
    constructor(
        id: number, 
        name: string, 
        provinces: Province[]){

            this.id = id,
            this.name = name;
            this.provinces = provinces;
    }
}