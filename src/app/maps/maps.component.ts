import { Component,OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Property } from 'app/property';
import { LatLong } from 'app/LatLong';
import { PropertyService } from 'app/property.service';
import { Development } from 'app/dev-overview/developments/development.model';

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
    development: Development = null;
    @Output()
    mapClick = new EventEmitter();
    

    constructor(private propertyService: PropertyService) {
    }

    ngOnInit() {
        const { development } = this;
        
        map = L.map('map',{scrollWheelZoom: true }).setView([ 
            development.latLong !== null ? development.latLong.lat : -41.3058, 
            development.latLong !== null ? development.latLong.long : 174.82082
        ], 18);

        if(development.latLong !== null)
            this.mark(development.latLong, development.address);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> Contributors'
        }).addTo(map);
            
        map.on('click', e => this.mark({lat: e.latlng.lat, long: e.latlng.lng}));
    }

    mark(latLng: LatLong, address: string = `Lat: ${latLng.lat}, Long: ${latLng.long}`){
        this.mapClick.emit(latLng as LatLong);

        if(marker) marker.removeFrom(map);
        marker = L.circleMarker([latLng.lat, latLng.long],{
            radius: 10,
            color: '#363636',
            fill: true,
            fillColor: '#00000',
            fillOpacity: .5
        }).bindPopup(`<strong>Address: </strong>${address}`);

        marker.addTo(map);
    }
}
