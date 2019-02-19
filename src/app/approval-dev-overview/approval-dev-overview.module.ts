import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { NgxLoadingModule } from 'ngx-loading';
import { MapsModule } from "app/maps/maps.module";
import { HttpClientModule } from '@angular/common/http';
import { Ng5SliderModule } from 'ng5-slider';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { ApprovalDevOverviewComponent } from "./approval-dev-overview.component";
import { PropertyService } from "app/property.service";
import { DevelopmentsComponent } from './developments/developments.component'
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SchemesComponent } from './developments/schemes.component';
import { SchemeComponent } from './developments/scheme.component';
import { ValidationMsgComponent } from "./developments/validation-msg.component";
import { DevConfirmComponent } from "./developments/dev-confirm.component";

const ROUTES: Routes = [
    { path: '', component: ApprovalDevOverviewComponent },
    { path: 'approval', component: DevelopmentsComponent},
    { path: 'approval/:id', component: DevelopmentsComponent}
];

@NgModule({
    imports: [ 
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MapsModule,
        HttpClientModule,
        // Ng5SliderModule,
        AngularFontAwesomeModule,
        // GalleryModule,
        NgxLoadingModule.forRoot({}),
        ToastModule.forRoot(),
        RouterModule.forChild(ROUTES)
    ],
    declarations: [ ApprovalDevOverviewComponent, DevelopmentsComponent, SchemesComponent, SchemeComponent, ValidationMsgComponent, DevConfirmComponent ],
    providers: [ PropertyService ],
    exports: [ ApprovalDevOverviewComponent, DevelopmentsComponent, SchemesComponent,ValidationMsgComponent, DevConfirmComponent ]
})
export class ApprovalDevOverviewModule {}