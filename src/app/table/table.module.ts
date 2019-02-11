import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { Ng5SliderModule } from 'ng5-slider';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

import { TableComponent } from "./table.component";
import { PropertyService } from "app/property.service";
import { DetailsComponent } from "app/details/details.component";
import { FormsModule } from "@angular/forms";
import { GalleryModule } from "app/gallery/gallery.module";
import { MapsModule } from "app/maps/maps.module";

const ROUTES: Routes = [
    { path: '', component: TableComponent },
    { path: 'details', component: DetailsComponent},
    { path: 'details/:id', component: DetailsComponent}
];

@NgModule({
    imports: [ 
        CommonModule,
        // Ng5SliderModule,
        FormsModule,
        MapsModule,
        // GalleryModule,
        ToastModule.forRoot(),
        RouterModule.forChild(ROUTES)
    ],
    declarations: [ TableComponent, DetailsComponent ],
    providers: [ PropertyService ],
    exports: [ TableComponent, DetailsComponent ]
})
export class TableModule {}