import { Component, Input, OnInit } from "@angular/core";

import { Development } from "./development.model";
import { PropertyService } from "app/property.service";

@Component({
    moduleId: module.id,
    selector: 'plb-confirm-view',
    templateUrl: 'dev-confirm.component.html'
})
export class DevConfirmComponent implements OnInit {
    
    @Input()
    development: Development;

    propertyTypes: any[];

    constructor(
        private propertyService: PropertyService
    ) { }

    ngOnInit(): void {
        const { propertyService } = this;

        this.propertyTypes = propertyService.getPropertyTypes();
    }
}