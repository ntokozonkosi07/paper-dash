import { Country } from "./country";
import { LatLong } from "./LatLong";

export class Property {
    constructor(public id: number,
        public propertyType: number,
        public size: number,
        public erf: number,
        public bedrooms: number,
        public kitchen: number,
        public lounge: number,
        public outbuildings: number,
        public office: number,
        public price: number,
        public diningrooms: number,
        public garages: number,
        public parking: number,
        public address: string,
        public latlng: LatLong) {
    }
}