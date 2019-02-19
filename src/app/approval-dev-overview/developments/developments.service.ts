import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { LatLong } from "app/LatLong";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DevelopmentsService {

    constructor(private http: HttpClient) {}

    reverseGeocode(latlong: LatLong){
        return this.http.get(`https://www.mapquestapi.com/geocoding/v1/reverse?key=FqE8NCv5j6Gf5VEs5MOTpEyRanhTQsAK&location=${latlong.lat}%2C${latlong.long}&outFormat=json&thumbMaps=false`)
    }

    getCurrentLocation(){
        return this.http.get('https://api.ipdata.co/?api-key=test').toPromise();
    }
}