import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Options } from 'ng5-slider';

import { Scheme } from "./scheme.model";
import { FormModelDTO } from "./form-group-dto.model";
import { PropertyService } from '../../property.service';

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
    @Input()
    address: string;
    @Input()
    enabled: boolean = true;

    propertyTypes: any[];
    schemeForm: FormGroup;
    options: Options = {
        floor: 0,
        ceil: 1000000
      };

    constructor(
        private formBuilder: FormBuilder,
        private propertyService: PropertyService
    ) { }

    ngOnInit(): void {
        debugger;
        if(!this.enabled)
            this.options.disabled = !this.enabled;

        this.propertyTypes = this.propertyService.propertyTypes;
            
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