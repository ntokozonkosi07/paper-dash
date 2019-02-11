import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Options } from 'ng5-slider';

import { Property } from "app/property";
import { PropertyService } from "app/property.service";
import { ToastsManager } from "ng2-toastr/ng2-toastr";

declare var $:any;

@Component({
    selector: 'table-cmp',
    moduleId: module.id,
    templateUrl: 'details.component.html'
})
export class DetailsComponent implements OnInit {

    // map veiw
    public id: number;
    // for the slider, should remove this line from here...
    public sliderOptions: Options;
    // steppers tracker
    public step: number = 0;

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
        this.id = parseInt(this.route.snapshot.paramMap.get("id")) || 0;

        //steppers
    }

    jumpToStep = (step: number) => {
        debugger;
        this.step = step;
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