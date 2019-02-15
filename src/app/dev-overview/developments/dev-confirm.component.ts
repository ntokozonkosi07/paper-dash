import { Component, Input } from "@angular/core";
import { Development } from "./development.model";

@Component({
    moduleId: module.id,
    selector: 'plb-confirm-view',
    templateUrl: 'dev-confirm.component.html'
})
export class DevConfirmComponent {
    @Input()
    development: Development;

    constructor() {
        debugger;
        console.log(this.development);
    }
}