import { Component, OnInit } from '@angular/core';

import { PropertyService } from 'app/property.service';
import { Property } from 'app/property';

declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
}

@Component({
    selector: 'table-cmp',
    moduleId: module.id,
    templateUrl: 'dev-overview.component.html'
})

export class DevOverviewComponent implements OnInit{
    public properties: Property[];
    public fields: any [];

    constructor(private propertyService: PropertyService) {this.properties = [];}
    
    ngOnInit(){
        this.fields = ['erf','street'];
        this.properties = this.propertyService.properties;
    }
}