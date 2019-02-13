export class Scheme {
    constructor(
        public id: number,
        public propertyType: number,
        public size: number,
        public erf: number,
        public bedroom: number,
        public kitchen: number,
        public lounge: number,
        public office: number,
        public price: number,
        public garages: number,
        public carport: number,
        public address: string,
        public description: string,
    ) { }
}