import { Scheme } from "./scheme.model";
import { LatLong } from "app/LatLong";

export class Development {
    
    constructor(
        public id: string,
        public name: string,
        public address: string,
        public latLong: LatLong,
        public schemes: Scheme[]
    ) { }
}