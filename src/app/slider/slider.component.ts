import { OnInit, Component } from "@angular/core";
import * as $ from 'jquery';

@Component({
    moduleId: module.id,
    selector: 'plb-slider',
    templateUrl: 'slider.component.html',
    styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
    constructor() { }

    ngOnInit(): void { 
        debugger;
        $("#slider").slider({
            animate: true,
            value:1,
            min: 0,
            max: 1000,
            step: 10,
            slide: function(event, ui) {
                this.update(1,ui.value); //changed
            }
        });
        
        this.update();
    }


    update(){
        debugger;
    }
}