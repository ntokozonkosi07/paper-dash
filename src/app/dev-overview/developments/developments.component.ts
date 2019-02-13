import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';

import { Property } from "app/property";
import { PropertyService } from "app/property.service";
import { ToastsManager } from "ng2-toastr/ng2-toastr";
import { LatLong } from "app/LatLong";
import { DevelopmentsService } from "./developments.service";

// declare var $:any;

@Component({
    selector: 'table-cmp',
    moduleId: module.id,
    templateUrl: 'developments.component.html',
    providers: [ DevelopmentsService ]
})
export class DevelopmentsComponent implements OnInit {

    //property id
    public id: number;
    // steppers tracker
    public step: number = 1;

    // state
    public property: Property;

    addressForm: FormGroup;
    submitted: Boolean = false;
    public loading = false;

    constructor(
        private route: ActivatedRoute,
        private propertyService: PropertyService,
        public toastr: ToastsManager,
        vcr: ViewContainerRef,
        private router: Router,
        private developmentService: DevelopmentsService,
        private formBuilder: FormBuilder) { 
            this.toastr.setRootViewContainerRef(vcr);
            this.property = {price: 0} as Property;
    }

    ngOnInit(): void {
        this.id = parseInt(this.route.snapshot.paramMap.get("id")) || 0;
        this.addressForm = this.formBuilder.group({
            address: ['', [Validators.required, Validators.minLength(3)]]
        });
    }

    jumpToStep = (step: number) => {
        debugger;
        this.step = step;
    }

    mapClick(latlong: LatLong){
        this.getAddress(latlong);
    }

    save(){
        try{
            this.submitted = true;

            if(this.addressForm.invalid)
                throw new Error('Please check the fields for potential mistakes!')

            this.jumpToStep(++this.step);
        } catch(e){
            this.toastr.warning(e.message);
        }
    }

    getAddress(latlong: LatLong){
        this.loading = true;
        this.developmentService.reverseGeocode(latlong)
            .subscribe((res:any) => {
                this.loading = false;
                const { adminArea1, adminArea3, adminArea5, postalCode, street } = res.results[0].locations[0];
                
                this.property.address = `${adminArea1}, ${adminArea3}, ${adminArea5}, ${postalCode}, ${street}`;
            }, error => {
                this.loading = false;
                this.toastr.warning('Could not get auto address');
            });
    }

    //#region saveOrUpdate
    // saveOrUpdate(property, formValidity){
    //     try{
    //         debugger;
    //         if(!formValidity)
    //          throw new Error('Please complete the form.');

    //          if(this.id !== 0){
    //             let index = this.propertyService.properties.findIndex(item => item.id === this.id);
    //             this.propertyService.properties[ index ] = property;
    //          } else {
    //             property.id = this.propertyService.properties.length + 1;
    //             this.propertyService.properties.push(property);
    //          }

             
    //          this.toastr.success('Property has been saved!','Success');

    //          setTimeout(_ => this.router.navigateByUrl('properties'), 700);
             
    //     }catch(e){
    //         this.toastr.warning(e.message,'Warning');
    //     }
    // }
    //#endregion
}