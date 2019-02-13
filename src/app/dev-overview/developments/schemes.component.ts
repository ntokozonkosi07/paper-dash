import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Scheme } from "./scheme.model";

@Component({
    moduleId: module.id,
    selector: 'plb-schemes',
    templateUrl: 'schemes.component.html'
})
export class SchemesComponent implements OnInit {
    
    schemeForm: FormGroup;
    schemes: Scheme[];
    
    constructor(
        private formBuilder: FormBuilder
    ) {
        this.schemes = [new Scheme(1,1,112,4124,2,1,1,1,15000000,2,2,"6 Invicta road, midrand, 1682","Enter each item on a new line, choose the amount of groups unders settings, and click the button to generate your randomized list. Don't like the first team? Just click again until you do.")];
    }

    ngOnInit(): void {
        this.schemeForm = this.formBuilder.group({
            address: ['', [ Validators.required, Validators.minLength(3)]],
            propertyType: ['', [ Validators.required ]],
            erf: ['', [ Validators.required ]],
            bedroom: ['', [ Validators.required ]],
            kitchen: ['', [ Validators.required ]],
            lounge: ['', [ Validators.required ]],
            office: ['', [ Validators.required ]],
            garage: ['', [ Validators.required ]],
            carport: ['', [ Validators.required ]],
            description: ['', [ Validators.required ]]
        });
    } 

}