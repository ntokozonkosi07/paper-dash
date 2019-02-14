import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { NgxLoadingModule } from 'ngx-loading';
import { MapsModule } from "app/maps/maps.module";
import { HttpClientModule } from '@angular/common/http';

import { DevOverviewComponent } from "./dev-overview.component";
import { PropertyService } from "app/property.service";
import { DevelopmentsComponent } from './developments/developments.component'
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SchemesComponent } from './developments/schemes.component';

const ROUTES: Routes = [
    { path: '', component: DevOverviewComponent },
    { path: 'development', component: DevelopmentsComponent},
    { path: 'development/:id', component: DevelopmentsComponent}
];

@NgModule({
    imports: [ 
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MapsModule,
        HttpClientModule,
        // GalleryModule,
        NgxLoadingModule.forRoot({}),
        ToastModule.forRoot(),
        RouterModule.forChild(ROUTES)
    ],
    declarations: [ DevOverviewComponent, DevelopmentsComponent, SchemesComponent ],
    providers: [ PropertyService ],
    exports: [ DevOverviewComponent, DevelopmentsComponent, SchemesComponent ]
})
export class DevOverviewModule {}