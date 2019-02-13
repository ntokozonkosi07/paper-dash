import { Component,OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Property } from 'app/property';
import { LatLong } from 'app/LatLong';
import { PropertyService } from 'app/property.service';

declare var L;
var map, marker;

@Component({
    moduleId: module.id,
    selector: 'plb-maps',
    templateUrl: 'maps.component.html'
})
export class MapsComponent implements OnInit {
    @Input() 
    id: number = 0;
    @Input()
    property: Property = null;
    @Output()
    mapClick = new EventEmitter();
    

    constructor(private propertyService: PropertyService) {
    }

    ngOnInit() {
        const { property } = this;

        map = L.map('map',{scrollWheelZoom: false }).setView([ 
            property.latlng || -41.3058, 
            property.latlng || 174.82082
        ], 18);

        if(property.latlng !== undefined)
            this.mark(property.latlng, property.address, property.price);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> Contributors'
        }).addTo(map);
            
        map.on('click', e => this.mark({lat: e.latlng.lat, long: e.latlng.lng}));
    }

    mark(latLng: LatLong, address: string = `Lat: ${latLng.lat}, Long: ${latLng.long}`, price: number = 0){
        this.mapClick.emit(latLng as LatLong);

        if(marker) marker.removeFrom(map);
        marker = L.circleMarker([latLng.lat, latLng.long],{
            radius: 10,
            color: '#363636',
            fill: true,
            fillColor: '#00000',
            fillOpacity: .5
        }).bindPopup(`<strong>Price: </strong>R ${price}<br/>
                        <strong>Address: </strong>${address}`);

        marker.addTo(map);
    }
}
