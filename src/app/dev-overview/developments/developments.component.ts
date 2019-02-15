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
    public step: number = 2;

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
        // this.id = parseInt(this.route.snapshot.paramMap.get("id")) || 0;
        this.addressForm = this.formBuilder.group({
            name: ['', [Validators.required, Validators.minLength(3)]],
            address: ['', [Validators.required, Validators.minLength(3)]]
        });

        this.development = new Development(uuid.v4(),'Polo Fields','NZ, Wellington, Wellington, 6011, Revans Street',
            new LatLong('50','50'),[
                new Scheme(uuid.v4(),1,104,778545,3,1,1,0,400000,1,1,'NZ, Wellington, Wellington, 6011, Revans Street','very cozy 3 bedrooom'),
                new Scheme(uuid.v4(),1,104,778545,2,1,1,0,500000,1,1,'NZ, Wellington, Wellington, 6011, Revans Street','very cozy 2 bedrooom'),
                new Scheme(uuid.v4(),2,104,778545,1,1,1,0,700000,1,1,'NZ, Wellington, Wellington, 6011, Revans Street','very cozy 1 bedrooom')
            ]);
    }

    jumpToStep = (step: number) => {
        debugger;
        this.step = step;
    }

    mapClick(latlong: LatLong){
        debugger;
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
        // this.loading = true;
        this.developmentService.reverseGeocode(latlong)
            .subscribe((res:any) => {
                debugger;
                this.loading = false;
                const { adminArea1, adminArea3, adminArea5, postalCode, street } = res.results[0].locations[0];
                
                this.development.address = `${adminArea1}, ${adminArea3}, ${adminArea5}, ${postalCode}, ${street}`;
            }, error => {
                debugger;
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