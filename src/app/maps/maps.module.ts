import { NgModule } from "@angular/core";
import { MapsComponent } from "./maps.component";
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [ CommonModule ],
    declarations: [ MapsComponent ],
    exports: [ MapsComponent ]
})
export class MapsModule {}