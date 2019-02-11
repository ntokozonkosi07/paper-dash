import { Component, OnInit } from "@angular/core";
import * as global from 'lightgallery.js';

declare var $:any;

@Component({
    moduleId: module.id,
    selector: 'plb-gallery',
    templateUrl: 'gallery.component.html',
})
export class GalleryComponent implements OnInit {

    constructor() {    
    }
    
    ngOnInit(): void {
        debugger;
        global.lightGallery(document.getElementById('lightgallery'))
    }

}