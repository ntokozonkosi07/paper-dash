import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Scheme } from "./scheme.model";

@Component({
    moduleId: module.id,
    selector: 'plb-scheme',
    templateUrl: 'scheme.component.html'
})
export class SchemeComponent implements OnInit {
    
    @Input()
    scheme: Scheme;

    schemeForm: FormGroup;

    sample: Connect;
    

    constructor(
        private formBuilder: FormBuilder
    ) { }

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