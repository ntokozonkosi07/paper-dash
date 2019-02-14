import { Component, OnInit } from "@angular/core";


import { Scheme } from "./scheme.model";

@Component({
    moduleId: module.id,
    selector: 'plb-schemes',
    templateUrl: 'schemes.component.html'
})
export class SchemesComponent implements OnInit {
    
    schemes: Scheme[];

    constructor() { 
        this.schemes = [new Scheme(1,1,112,4124,2,1,1,1,15000000,2,2,"6 Invicta road, midrand, 1682","Enter each item on a new line, choose the amount of groups unders settings, and click the button to generate your randomized list. Don't like the first team? Just click again until you do.")];
    }

    ngOnInit(): void { } 

    newScheme(){
        if(this.schemes.length > 0)
            this.schemes.push({ price: 0} as Scheme);
        this.schemes.push({ price: 0, expanded: true } as Scheme);
    }
}