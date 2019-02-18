import { Component, OnInit } from '@angular/core';

import { PropertyService } from 'app/property.service';
import { Property } from 'app/property';
import { Development } from './developments/development.model';

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
    public developments: Development[];
    public fields: any [];

    constructor(private propertyService: PropertyService) {this.developments = [];}
    
    ngOnInit(){
        this.fields = ['street'];
        this.developments = this.propertyService.getDevelopments();
        debugger;
    }
}