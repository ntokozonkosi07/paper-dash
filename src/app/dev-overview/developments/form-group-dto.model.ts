import { FormGroup } from "@angular/forms";

export class FormModelDTO {
    constructor(
        public index: number,
        public formGroup: FormGroup
    ) {}
}