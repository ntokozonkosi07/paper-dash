import { Injectable } from "@angular/core";
import { Property } from "./property";
import { LatLong } from "./LatLong";


@Injectable() 
export class PropertyService{
    
    properties: Property[];
    provinces: any[];
    propertyTypes: any[];

    constructor() {

        this.propertyTypes = [{
            id: 1, name: 'Residential'
        },{
            id: 2, name: 'Commercial'
        },{
            id: 3, name: 'Idustrial'
        }];;

        this.provinces = [
            {id: 1, name: 'KZN'},
            {id: 2, name: 'GP'},
            {id: 3, name: 'MP'},
            {id: 4, name: 'EC'},
            {id: 5, name: 'FS'}
        ];

        this.properties = [ 
            new Property(1,1,45145,223322,2,1,1,0,0,700340,1,2,1,"6th, Invicta Rd, Midrand, 1684, South Africa",new LatLong('-25.981753271590883', '28.121663331985474')),
            new Property(2,1,45145,254542,2,1,1,0,0,600404,1,2,1,"5th Rd, Carlswald, Midrand, 1686, South Africa",new LatLong('-25.980576635324983', '28.115435242652897')),
            new Property(3,1,45145,65565,2,1,1,0,0,400340,1,2,1,"74 Albertyn St, Vorna Valley, Midrand, 1686, South Africa",new LatLong('-25.99937247308598', '28.100055456161503'))
        ];
    }
}