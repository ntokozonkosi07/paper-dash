import { Component, OnInit, ViewChildren, QueryList, AfterViewInit, Input } from "@angular/core";
import * as uuid from 'uuid';
import { ToastsManager } from 'ng2-toastr/ng2-toastr'

import { Scheme } from "./scheme.model";
import { SchemeComponent } from './scheme.component';
import { FormGroup } from "@angular/forms";
import { FormModelDTO } from "./form-group-dto.model";

@Component({
    moduleId: module.id,
    selector: 'plb-schemes',
    templateUrl: 'schemes.component.html'
})
export class SchemesComponent implements OnInit, AfterViewInit {
    
    @Input()
    schemes: Scheme[];    

    constructor(
        public toastr: ToastsManager
    ) { 
        
    }

    ngOnInit(): void { 
        if(this.schemes.length > 0)
            this.schemes[0].expanded = true;
    } 

    ngAfterViewInit(): void {
        //
    }


    newScheme(){
        // if(this.schemes.length > 0)
        //     this.schemes.push({ price: 0} as Scheme);
        let scheme = new Scheme(uuid.v4(),0,0,0,0,0,0,0,0,0,0,'','');
        this.addAccordionPage(scheme);
    }

    formModelChange(formData: FormModelDTO){
        this.schemes[formData.index].valid = formData.formGroup.valid;
    }

    addAccordionPage(scheme: Scheme){
        this.schemes.push(scheme);
        this.schemes.forEach(s => s.expanded = false);
        
        this.schemes[this.schemes.length - 1].expanded = true;
    }

    toggleAccordion(index){
        this.schemes.forEach((s,i) => {
            if(index !== i) 
                s.expanded = !s.expanded;
            s.expanded = false;
        });

        this.schemes[index].expanded = true;
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