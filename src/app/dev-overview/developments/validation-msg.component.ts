import { OnInit, Component, Input } from "@angular/core";

@Component({
    moduleId: module.id,
    selector: 'plb-validation-msg',
    template: `
            <div *ngIf="touched">
                <div class="alert alert-danger" *ngIf="validation" role="alert">
                    {{message}}
                </div>
            </div>
        `
})
export class ValidationMsgComponent implements OnInit{

    @Input()
    touched: boolean = false;
    @Input()
    validation: boolean = false;
    @Input()
    message: string = 'This field is required!';
    
    constructor() { }

    ngOnInit(): void { }
    
}