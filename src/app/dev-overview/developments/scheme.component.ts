import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Scheme } from "./scheme.model";
import { FormModelDTO } from "./form-group-dto.model";

@Component({
    moduleId: module.id,
    selector: 'plb-scheme',
    templateUrl: 'scheme.component.html'
})
export class SchemeComponent implements OnInit {
    
    @Input()
    scheme: Scheme;
    @Input()
    index: number;
    @Output()
    change= new EventEmitter<FormModelDTO>();

    schemeForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit(): void {
            
        this.schemeForm = this.formBuilder.group({
            address: [{ disabled: true }, [ Validators.required, Validators.minLength(3)]],
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

    onChange(index: number, schemeForm: FormGroup){
        this.change.emit(new FormModelDTO(index,schemeForm));
    }
}