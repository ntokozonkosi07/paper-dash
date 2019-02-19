import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';
import * as uuid from 'uuid';

import { Property } from "app/property";
import { PropertyService } from "app/property.service";
import { ToastsManager } from "ng2-toastr/ng2-toastr";
import { LatLong } from "app/LatLong";
import { DevelopmentsService } from "./developments.service";
import { Scheme } from "./scheme.model";
import { Development } from "./development.model";

// declare var $:any;

@Component({
    selector: 'table-cmp',
    moduleId: module.id,
    templateUrl: 'developments.component.html',
    providers: [ DevelopmentsService ]
})
export class DevelopmentsComponent implements OnInit {

    //property id
    // public id: number;
    // steppers tracker
    public step: number = 0;

    addressForm: FormGroup;
    submitted: Boolean = false;
    public loading = false;

    development: Development;

    constructor(
        private route: ActivatedRoute,
        private propertyService: PropertyService,
        public toastr: ToastsManager,
        vcr: ViewContainerRef,
        private router: Router,
        private developmentService: DevelopmentsService,
        private formBuilder: FormBuilder) { 
            this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit(): void {
        const { paramMap } = this.route.snapshot;

        this.development = paramMap.get('id') == null 
            ? new Development(uuid.v4(), '','',new LatLong('0','0'),[] as Scheme[])
            : this.propertyService.getDevelopments().find(item => item.id == paramMap.get('id'));

        this.addressForm = this.formBuilder.group({
            name: ['', [Validators.required, Validators.minLength(3)]],
            address: ['', [Validators.required, Validators.minLength(3)]]
        });
    }

    jumpToStep = (step: number) => {
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

    validateSchemes(){
        try{
            if(this.development.schemes.length === 0)
                throw new Error('Please add a scheme to a development!');

            this.development.schemes.forEach(s => {
                if(!s.valid)
                    throw new Error('Please check the incomplete schemes!')
            })

            this.jumpToStep(++this.step);
        } catch(e){
            this.toastr.warning(e.message);
        }
    }

    getAddress(latlong: LatLong){
        debugger;
        // this.loading = true;
        this.developmentService.reverseGeocode(latlong)
            .subscribe((res:any) => {
                this.loading = false;
                const { adminArea1, adminArea3, adminArea5, postalCode, street } = res.results[0].locations[0];
                
                this.development.address = `${adminArea1}, ${adminArea3}, ${adminArea5}, ${postalCode}, ${street}`;
            }, error => {
                this.loading = false;
                this.toastr.warning('Could not get auto address');
            });
    }

    //#region saveOrUpdate
    saveOrUpdate(dev: Development){
        try{
            const { propertyService } = this;

            let index = propertyService.getDevelopments().findIndex(item => item.id === dev.id);
            if(index > -1)
                this.propertyService.getDevelopments()[index] = dev;
            else
                this.propertyService.getDevelopments().push(dev);

            this.toastr.success('Property has been saved!','Success');

             setTimeout(_ => this.router.navigateByUrl('developments'), 700);
             
        }catch(e){
            this.toastr.warning(e.message,'Warning');
        }
    }
    //#endregion
}