import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DevOverviewComponent } from "./dev-overview.component";
import { PropertyService } from '../property.service';

describe('dev-overview', ()=>{
    let fixture: ComponentFixture<DevOverviewComponent>;
    let mockPropertyService;

    beforeEach(()=>{
        mockPropertyService = jasmine.createSpyObj('PropertyService',['developments']);

        TestBed.configureTestingModule({
            imports: [],
            declarations: [DevOverviewComponent],
            providers: [
                { provicde: PropertyService, useValue: mockPropertyService }
            ]
        });    

        fixture = TestBed.createComponent(DevOverviewComponent);
    });

    it('Should get list of developments',()=>{
        
    });
});