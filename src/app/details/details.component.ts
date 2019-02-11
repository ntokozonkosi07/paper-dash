import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Options } from 'ng5-slider';

import { Property } from "app/property";
import { PropertyService } from "app/property.service";
import { ToastsManager } from "ng2-toastr/ng2-toastr";
import { LatLong } from "app/LatLong";

declare var L;
var map, marker;

@Component({
    selector: 'table-cmp',
    moduleId: module.id,
    templateUrl: 'details.component.html'
})
export class DetailsComponent implements OnInit {

    // map veiw
    public id: number;
    public sliderOptions: Options;

    hasPropertyTypeError = false

    // ref data
    propertyTypes: any[];

    // state
    public property: Property;

    constructor(
        private route: ActivatedRoute,
        private propertyService: PropertyService,
        public toastr: ToastsManager,
        vcr: ViewContainerRef,
        private router: Router) { 
            this.toastr.setRootViewContainerRef(vcr);
            this.property = {price: 0} as Property;
            this.sliderOptions = {
                floor: 0,
                ceil: 5000000
            };
    }

    ngOnInit(): void {

        this.propertyTypes = this.propertyService.propertyTypes;
        
        this.id = parseInt(this.route.snapshot.paramMap.get("id")) || 0;
        if(this.id > 0){
            this.property = this.propertyService.properties.find(item => item.id === this.id);
            map = L.map('map',{scrollWheelZoom:false}).setView([this.property.latlng.lat, this.property.latlng.long], 18);
            this.mark(this.property.latlng, this.property.address, this.property.price);
        } else {
            map = L.map('map',{scrollWheelZoom:false}).setView([-41.3058, 174.82082], 8);
        }

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> Contributors'
        }).addTo(map);

        // var shpfile = new L.Shapefile('../assets/study-area.geojson');
        // shpfile.addTo(map);
            
        map.on('click', e => this.mark({lat: e.latlng.lat, long: e.latlng.lng}));
    }

    mark(latLng: LatLong, address: string = `Lat: ${latLng.lat}, Long: ${latLng.long}`, price: number = 0){
        this.property.latlng = new LatLong(latLng.lat,latLng.long);
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

    validatePropertyType(value){
        if(value === undefined)
            this.hasPropertyTypeError = true;
        else
            this.hasPropertyTypeError = false;
    }

    saveOrUpdate(property, formValidity){
        try{
            debugger;
            if(!formValidity)
             throw new Error('Please complete the form.');

             if(this.id !== 0){
                let index = this.propertyService.properties.findIndex(item => item.id === this.id);
                this.propertyService.properties[ index ] = property;
             } else {
                property.id = this.propertyService.properties.length + 1;
                this.propertyService.properties.push(property);
             }

             
             this.toastr.success('Property has been saved!','Success');

             setTimeout(_ => this.router.navigateByUrl('properties'), 700);
             
        }catch(e){
            this.toastr.warning(e.message,'Warning');
        }
    }

}