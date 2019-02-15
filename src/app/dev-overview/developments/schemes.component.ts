import { Component, OnInit, ViewChildren, QueryList, AfterViewInit, Input } from "@angular/core";
import * as uuid from 'uuid';
import { ToastsManager } from 'ng2-toastr/ng2-toastr'

import { Scheme } from "./scheme.model";
import { SchemeComponent } from './scheme.component';
import { FormGroup } from "@angular/forms";
import { FormModelDTO } from "./form-group-dto.model";
import { Development } from "./development.model";

@Component({
    moduleId: module.id,
    selector: 'plb-schemes',
    templateUrl: 'schemes.component.html'
})
export class SchemesComponent implements OnInit, AfterViewInit {
    
    @Input()
    development: Development;
    
    @ViewChildren(SchemeComponent)
    schemeComponents: QueryList<SchemeComponent>;

    constructor(
        public toastr: ToastsManager
    ) { 
        
    }

    ngOnInit(): void { 
        if(this.development.schemes.length > 0)
            this.development.schemes[0].expanded = true;
    } 

    ngAfterViewInit(): void {
        this.schemeComponents.forEach((c,i) => this.formModelChange(new FormModelDTO(i, c.schemeForm)) );
    }


    newScheme(){
        debugger;
        // if(this.schemes.length > 0)
        //     this.schemes.push({ price: 0} as Scheme);
        let scheme = new Scheme(uuid.v4(),0,0,0,0,0,0,0,0,0,0,'','');
        this.addAccordionPage(scheme);
    }

    formModelChange(formData: FormModelDTO){
        this.development.schemes[formData.index].valid = formData.formGroup.valid;
    }

    addAccordionPage(scheme: Scheme){

        this.development.schemes.push(scheme);
        this.development.schemes.forEach(s => s.expanded = false);
        
        this.development.schemes[this.development.schemes.length - 1].expanded = true;
    }

    toggleAccordion(index){
        this.development.schemes.forEach((s,i) => {
            if(index !== i) 
                s.expanded = !s.expanded;
            s.expanded = false;
        });

        this.development.schemes[index].expanded = true;
    }

    saveOrUpdate(schemes: Scheme[]){
        try{
            schemes.forEach(scheme =>{
                if(!scheme.valid)
                    throw Error('Please complete the form!');
            })
        }catch(e){
            this.toastr.warning(e.message,'Warning')
        }
    }
      
}