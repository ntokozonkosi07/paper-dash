import { ComponentFixture, TestBed } from "@angular/core/testing";
import * as uuid from 'uuid';
import { of } from 'rxjs/observable/of';
import { By } from "@angular/platform-browser";

import { DevOverviewComponent } from "./dev-overview.component";
import { PropertyService } from '../property.service';
import { Development } from "./developments/development.model";
import { Scheme } from "./developments/scheme.model";
import { LatLong } from "app/LatLong";

import { CommonModule } from "@angular/common";
import { NO_ERRORS_SCHEMA } from "@angular/core";

describe('dev-overview', ()=>{
    let fixture: ComponentFixture<DevOverviewComponent>;
    let mockPropertyService;
    let DEVELOPMENTS = [];

    beforeEach(()=>{
        mockPropertyService = jasmine.createSpyObj('PropertyService',['getDevelopments']);
        DEVELOPMENTS = [ 
            new Development(uuid.v4(),'Polo Fields', '74 Albertyn St, Vorna Valley, Midrand, 1686, South Africa',new LatLong('-25.99937247308598', '28.100055456161503'),
            [
                new Scheme(uuid.v4(),1,104,54124,3,1,1,0,500000,3,1,'','Clean properties'),
                new Scheme(uuid.v4(),1,104,54125,2,1,1,0,650000,2,1,'','Cool properties'),
                new Scheme(uuid.v4(),1,104,54125,2,1,1,0,850000,1,1,'','Nice properties')
            ])
        ];

        TestBed.configureTestingModule({
            imports: [
                CommonModule,
            ],
            declarations: [DevOverviewComponent],
            providers: [
                { provide: PropertyService, useValue: mockPropertyService }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        });    

        fixture = TestBed.createComponent(DevOverviewComponent);
    });

    it('Should get list of developments',()=>{
        mockPropertyService.getDevelopments.and.returnValue(DEVELOPMENTS);
        fixture.detectChanges();

        expect(mockPropertyService.getDevelopments).toHaveBeenCalled()
    });

    it('should display list of schemes in developments',()=>{
        mockPropertyService.getDevelopments.and.returnValue(DEVELOPMENTS);
        fixture.detectChanges();
        const tableRows = fixture.debugElement.queryAll(By.css('table>tbody>tr'));

        expect(tableRows.length).toBe(3);        
    });
});